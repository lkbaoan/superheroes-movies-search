import { neon } from "@neondatabase/serverless";

exports.handler = async (event) => {
  const sql = neon(process.env.DATABASE_URL);
  const index =
    event.queryStringParameters.index !== undefined
      ? parseInt(event.queryStringParameters.index)
      : 0;
  const input =
    event.queryStringParameters.input !== ""
      ? event.queryStringParameters.input.toLowerCase()
      : "";

  try {
    let results = {};
    if (input === "") {
      const totalCharacters = await sql("SELECT COUNT(*) FROM characters");
      const rows = await sql(
        `SELECT * FROM characters OFFSET ${index * 100} LIMIT 100`
      );
      const max = Math.ceil(parseInt(totalCharacters[0].count) / 100);

      results.maxPage = max;
      results.total = parseInt(totalCharacters[0].count);
      results.previous = index <= 0 ? null : index - 1;
      results.next = index >= max - 1 ? null : index + 1;
      results.results = rows;
    } else {
      const totalCharacters = await sql(
        `SELECT COUNT(*) FROM characters WHERE LOWER(name) LIKE '%${input}%'`
      );
      const rows = await sql(
        `SELECT * FROM characters WHERE LOWER(name) LIKE '%${input}%' OFFSET ${
          index * 100
        } LIMIT 100`
      );
      const max = Math.ceil(parseInt(totalCharacters[0].count) / 100);

      results.maxPage = max;
      results.total = parseInt(totalCharacters[0].count);
      results.previous = index <= 0 ? null : index - 1;
      results.next = index >= max - 1 ? null : index + 1;

      results.results = rows;
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Cannot fetch characters list" }),
    };
  }
};
