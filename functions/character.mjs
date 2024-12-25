import axios from "axios";

exports.handler = async (event) => {
  const apiCode = event.queryStringParameters.apiCode;

  try {
    const response = await axios.get(
      `${process.env.COMIC_VINE_CHAR_URL}/${apiCode}`,
      {
        params: {
          api_key: process.env.COMIC_VINE_API,
          format: "json",
        },
      }
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Cannot fetch character" }),
    };
  }
};
