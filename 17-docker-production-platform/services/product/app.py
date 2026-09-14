from flask import Flask, jsonify
import os
import psycopg2
import redis
import json

app = Flask(__name__)


def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "product-db"),
        database=os.getenv("DB_NAME", "productdb"),
        user=os.getenv("DB_USER", "productuser"),
        password=os.getenv("DB_PASSWORD", "productpass"),
    )


redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST", "redis-cache"),
    port=6379,
    decode_responses=True
)


@app.route("/products")
def products():
    cached_products = redis_client.get("products")

    if cached_products:
        return jsonify(json.loads(cached_products))

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, name, price FROM products ORDER BY id")
    products = cursor.fetchall()

    cursor.close()
    conn.close()

    product_data = [
        {
            "id": product[0],
            "name": product[1],
            "price": product[2]
        }
        for product in products
    ]

    redis_client.setex(
        "products",
        60,
        json.dumps(product_data)
    )

    return jsonify(product_data)


@app.route("/health")
def health():
    return jsonify({"status": "healthy"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
