async function successResponse(statusCode, message, data = null) {
  return {
    success: true,
    statusCode,
    message,
    data,
  };
}

export default successResponse;
