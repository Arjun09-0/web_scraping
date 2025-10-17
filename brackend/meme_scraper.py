import praw
import time

REDDIT_CLIENT_ID = '3___EDUZKghawZ6jvG3EPA'
REDDIT_CLIENT_SECRET = 'A_NcJiJXRTLxf5ABBSfYGVYTOZLq7Q'
REDDIT_USER_AGENT = 'meme-scraper/0.1 by u/Dismal_Weakness_8440'

# Simple in-memory cache for memes per genre
_meme_cache = {}
_cache_expiry = 60 * 30  # 30 minutes

def get_memes_by_genre(genre, page=1, limit=10):
    subreddit_map = {
        'funny': 'memes',
        'wholesome': 'wholesomememes',
        'dank': 'dankmemes',
        'gaming': 'gamingmemes',
        'history': 'historymemes',
        'programming': 'ProgrammerHumor',
        'cats': 'catmemes',
        'dogs': 'dogmemes',
        'anime': 'animememes',
        'all': 'memes'
    }
    subreddit = subreddit_map.get(genre, 'memes')
    now = time.time()
    cache_key = f'{subreddit}'
    # Use cache if available and not expired
    if cache_key in _meme_cache and now - _meme_cache[cache_key]['time'] < _cache_expiry:
        all_memes = _meme_cache[cache_key]['memes']
    else:
        reddit = praw.Reddit(
            client_id=REDDIT_CLIENT_ID,
            client_secret=REDDIT_CLIENT_SECRET,
            user_agent=REDDIT_USER_AGENT
        )
        posts = reddit.subreddit(subreddit).top(time_filter='day', limit=50)
        all_memes = []
        for post in posts:
            if post.url.endswith(('.jpg', '.jpeg', '.png', '.gif')):
                all_memes.append({
                    'title': post.title,
                    'url': post.url
                })
        _meme_cache[cache_key] = {'memes': all_memes, 'time': now}
    # Pagination
    start = (page - 1) * limit
    end = start + limit
    paged_memes = all_memes[start:end]
    if not paged_memes:
        paged_memes = [{'title': 'No memes found', 'url': ''}]
    return paged_memes
