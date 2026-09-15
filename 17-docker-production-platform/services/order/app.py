from flask import Flask, jsonify, request
import os
import json
import psycopg2
import pika

app = Flask(__name__)


def get_db_password():
    secret_path = "/run/secrets/order_db_password"

    if os.path.exists(secret_path):
        with open(secret_path, "r") as secret_file:
            return secret_file.read().strip()

    return os.getenv("DB_PASSWORD", "orderpass")


def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "order-db"),
        database=os.getenv("DB_NAME", "orderdb"),
        user=os.getenv("DB_USER", "orderuser"),
        password=get_db_password(),
    )


def publish_order_event(order):
    connection = pika.BlockingConnection(
        pika.ConnectionParameters("rabbitmq")
    )

    channel = connection.channel()

    channel.queue_declare(
        queue="order-events",
        durable=True
    )

    channel.basic_publish(
        exchange="",
        routing_key="order-events",
        body=json.dumps(order),
        properties=pika.BasicProperties(
            delivery_mode=2
        )
    )

    connection.close()


@app.route("/orders", methods=["POST"])
def create_order():
    data = request.get_json()

    user_id = data.get("user_id")
    product_id = data.get("product_id")
    quantity = data.get("quantity")

    if not user_id or not product_id or not quantity:
        return jsonify({
            "error": "user_id, product_id and quantity are required"
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO orders (user_id, product_id, quantity)
        VALUES (%s, %s, %s)
        RETURNING id, user_id, product_id, quantity, status, created_at
        """,
        (user_id, product_id, quantity)
    )

    order = cursor.fetchone()

    conn.commit()

    cursor.close()
    conn.close()

    order_data = {
        "id": order[0],
        "user_id": order[1],
        "product_id": order[2],
        "quantity": order[3],
        "status": order[4],
        "created_at": order[5].isoformat()
    }

    publish_order_event(order_data)

    return jsonify(order_data), 201


@app.route("/orders", methods=["GET"])
def get_orders():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, user_id, product_id, quantity, status, created_at
        FROM orders
        ORDER BY id
        """
    )

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    orders = [
        {
            "id": row[0],
            "user_id": row[1],
            "product_id": row[2],
            "quantity": row[3],
            "status": row[4],
            "created_at": row[5].isoformat()
        }
        for row in rows
    ]

    return jsonify(orders)


@app.route("/health")
def health():
    return jsonify({
        "status": "healthy"
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
