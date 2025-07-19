async function errorResponse(statusCode, message, error = null) {
  return {
    success: false,
    statusCode,
    message,
    error,
  };
}

export default errorResponse;
