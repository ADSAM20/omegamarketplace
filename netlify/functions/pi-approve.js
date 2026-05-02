exports.handler = async function(event, context) {
  try {
    const { paymentId } = JSON.parse(event.body || "{}");
    console.log("Approving payment:", paymentId);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
};
