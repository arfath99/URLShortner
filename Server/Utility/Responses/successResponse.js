async function successResponse(statusCode, message, data = null) {
  return {
    success: true,
    statusCode: statusCode,
    message: message,
    data: data,
  };
}

export default successResponse;
