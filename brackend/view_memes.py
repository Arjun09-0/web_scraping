from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['memesdb']
collection = db['memes']

for meme in collection.find():
    print(f"Genre: {meme.get('genre')}, Title: {meme.get('title')}, URL: {meme.get('url')}")
