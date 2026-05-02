exports.handler = async function(event) {
  console.log("✅ Payment completed successfully");
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
