exports.handler = async (event) => {
  try {
    const { paymentId } = JSON.parse(event.body);
    
    if (!paymentId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing paymentId" })
      };
    }

    const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/cancel`, {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.PI_API_KEY}`,
        "Content-Type": "application/json"
      }
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