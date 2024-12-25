import axios from "axios";

exports.handler = async (event) => {
  let results = {};
  if (event.queryStringParameters.names === undefined) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Err" }),
    };
  }
  const moviesArr = JSON.parse(event.queryStringParameters.names);

  try {
    let movies = await Promise.all(
      moviesArr.map(async (movie) => {
        let response = await axios.get(`${process.env.OMDB_URL}`, {
          params: {
            apikey: process.env.OMDB_API,
            t: movie,
          },
        });

        return response.data;
      })
    );
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ results: movies }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Cannot fetch movies" }),
    };
  }
};
