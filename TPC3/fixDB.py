import json
import re
import sys

def fix_movies(input_filename):
    with open(input_filename, "r", encoding="utf-8") as f:
        movies = []
        actors = {}
        actors_DB = []
        genres = {}
        genres_DB = []
        seen_titles = {}

        for line in f:
            entry = json.loads(line)

            title = entry['title']
            year = entry['year']

            current_cast = []
            current_genre = []

            for actor in entry.get('cast', []):
                if re.fullmatch(r'\b[A-Z]\w+(?: [A-Z]\w+)*\b', actor):
                    if actor not in actors:
                        actors[actor] = []
                    actors[actor].append(title)
                    current_cast.append(actor)

            for genre in entry.get('genres', []):
                if genre not in genres:
                    genres[genre] = []
                genres[genre].append(title)
                current_genre.append(genre)

            if (title,year) in seen_titles:
                movie = seen_titles[(title,year)]
                movie.update({
                    'cast': list(set(movie.get('cast', []) + current_cast)),
                    'genres': list(set(movie.get('genres', []) + current_genre))
                })
            else:
                seen_titles[(title,year)] = {
                    'id': entry['_id']['$oid'],
                    'title': title,
                    'year': year,
                }

                if current_cast: seen_titles[(title,year)].update({'cast': current_cast})
                if current_genre: seen_titles[(title,year)].update({'genres': current_genre})

                movies.append(seen_titles[(title,year)])

        for actor, actor_movies in actors.items():
            actors_DB.append({"id": actor, "movies": actor_movies})

        for genre, genre_movies in genres.items():
            genres_DB.append({"id": genre, "movies": genre_movies})

        fixedDB = {
            "movies": movies,
            "actors": actors_DB,
            "genres": genres_DB
        }

        return fixedDB

if __name__ == "__main__":
    input = sys.argv[1]
    output = "fix_" + input 

    fixedDB = fix_movies(input)

    with open(output, 'w', encoding='utf-8') as file:
        json.dump(fixedDB, file, indent=2)

