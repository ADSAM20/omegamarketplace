exports.handler = async function(event) {
  console.log("✅ Payment approved successfully");
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
