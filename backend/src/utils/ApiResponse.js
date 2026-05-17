class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode;
    this.success = true;
    this.data = data;
    this.message = message;
  }

  static success(res, data, message = 'Success', statusCode = 200, meta = null) {
    return res.status(statusCode).json({
      success: true,
      data,
      message,
      ...(meta && { meta }),
    });
  }

  static error(res, message = 'Internal Server Error', statusCode = 500, error = null) {
    const response = {
      success: false,
      error: {
        code: statusCode,
        message,
      },
    };

    if (process.env.NODE_ENV === 'development' && error) {
      response.error.details = error;
    }

    return res.status(statusCode).json(response);
  }
}

module.exports = ApiResponse;
