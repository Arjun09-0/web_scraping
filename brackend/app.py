import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from meme_scraper import get_memes_by_genre, save_memes_to_db, get_memes_from_db
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

class Meme(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    genre = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    url = db.Column(db.String(300), nullable=False)

# Ensure tables are created at startup
with app.app_context():
    db.create_all()

@app.route('/memes')
def memes():
    genre = request.args.get('genre', 'all')
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    # Try to get memes from MySQL first
    memes = get_memes_from_db(db, Meme, genre, page, limit)
    if not memes or (len(memes) == 1 and memes[0]['title'] == 'No memes found'):
        memes = get_memes_by_genre(genre, page, limit)
        save_memes_to_db(db, Meme, genre, memes)
    return jsonify(memes)

if __name__ == '__main__':
    app.run(debug=True)
