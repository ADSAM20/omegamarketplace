exports.handler = async function(event, context) {
  try {
    const { paymentId, txid } = JSON.parse(event.body || "{}");
    console.log("Completing payment:", { paymentId, txid });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
};
