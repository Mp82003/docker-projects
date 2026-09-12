from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if username == "admin" and password == "secret":
        return jsonify({
            "message": "Login successful"
        }), 200

    return jsonify({
        "message": "Invalid credentials"
    }), 401


@app.route("/health")
def health():
    return jsonify({
        "status": "healthy"
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
