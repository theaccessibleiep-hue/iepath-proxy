exports.handler = async function (event) {

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // CORS headers — update the origin to your actual domain
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // Handle preflight CORS check from the browser
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body);

    // Basic safety check — don't forward empty or malformed requests
    if (!body.messages || !Array.isArray(body.messages)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid request format" }),
      };
    }

    // Call the Anthropic API — key is stored in Netlify env, never in your code
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: body.messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API error:", data);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: "AI service error. Please try again." }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };

  } catch (err) {
    console.error("Proxy error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Proxy server error. Please try again." }),
    };
  }
};