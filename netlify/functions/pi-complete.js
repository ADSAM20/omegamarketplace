exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { paymentId, txid } = JSON.parse(event.body || "{}");
    
    if (!paymentId || !txid) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing paymentId or txid" }) };
    }

    console.log("Completing payment:", { paymentId, txid });

    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.PI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ txid })
    });

    const data = await response.json();
    console.log("Pi API response:", response.status, data);

    return {
      statusCode: response.ok ? 200 : response.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
