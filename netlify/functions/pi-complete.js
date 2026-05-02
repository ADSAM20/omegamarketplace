exports.handler = async (event) => {
  try {
    const { paymentId, txid } = JSON.parse(event.body);
    
    if (!paymentId || !txid) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing paymentId or txid" })
      };
    }

    const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.PI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ txid })
    });

    const data = await res.json();
    
    return {
      statusCode: res.ok ? 200 : res.status,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};