# [Comic Movies Search](https://comic-movies-search.netlify.app/)

This project using React to create the website, it also utilize Netlify serverless function to make call to api and database. The characters and movies are based on [Comic Vine api](https://comicvine.gamespot.com/) and [OMDB api](https://www.omdbapi.com/). 

To speed up process of searching for comic character, a simple database that contain is needed. This [file](https://github.com/lkbaoan/nodejs-web-server/blob/master/characters.json) contain a json of the characters.

## Run
- Clone project `git clone https://github.com/lkbaoan/superheroes-movies-search.git`
- Install dependencies `npm install`
- Create `.env` file that contain `DATABASE_URL, COMIC_VINE_CHAR_URL, OMDB_URL, COMIC_VINE_API, OMDB_API`
- Install Netlify CLI `npm install netlify-cli -g`
- Start local server `netlify dev`
  
## Netlify & Neon
The project use [Netlify serverless function](https://www.netlify.com/blog/intro-to-serverless-functions) and [Neon Serverless Postgres](https://neon.tech/) for its api call and database retrival. As such, a netlify account and neon account are needed in order for it to function. Otherwise, adjustment will be needed.
