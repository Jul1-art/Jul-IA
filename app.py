from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    # Renvoie directement le fichier HTML, peu importe son emplacement
    html_path = os.path.join(os.path.dirname(__file__), "Jul-IA.html")
    return send_file(html_path)

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")

    response = requests.post(
        "http://localhost:11434/api/chat",
        headers={"Content-Type": "application/json"},
        json={
            "model": "neural-chat",
            "messages": [{"role": "user", "content": user_message}]
        }
    )

    data = response.json()
    reply = data.get("message", {}).get("content", "")
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
