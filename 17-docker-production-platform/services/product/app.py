from flask import Flask, jsonify
import os
import psycopg2

app = Flask(__name__)


def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "product-db"),
        database=os.getenv("DB_NAME", "productdb"),
        user=os.getenv("DB_USER", "productuser"),
        password=os.getenv("DB_PASSWORD", "productpass"),
    )


@app.route("/products")
def products():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, name, price FROM products ORDER BY id")
    products = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify([
        {
            "id": product[0],
            "name": product[1],
            "price": product[2]
        }
        for product in products
    ])


@app.route("/health")
def health():
    return jsonify({"status": "healthy"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
