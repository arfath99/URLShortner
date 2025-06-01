async function errorResponse(statusCode, message, error = null) {
  return {
    success: false,
    statusCode: statusCode,
    message: message,
    error: error,
  };
}

export default errorResponse;
