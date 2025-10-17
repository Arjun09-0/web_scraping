
from flask import Flask, request, jsonify
from flask_cors import CORS
from meme_scraper import get_memes_by_genre

app = Flask(__name__)
CORS(app)

@app.route('/memes')
def memes():
    genre = request.args.get('genre', 'all')
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    memes = get_memes_by_genre(genre, page, limit)
    return jsonify(memes)

if __name__ == '__main__':
    app.run(debug=True)
