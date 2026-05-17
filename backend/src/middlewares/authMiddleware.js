const authService = require('../services/authService');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const authMiddleware = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Unauthorized access');
  }

  const token = authHeader.split(' ')[1];
  const decoded = authService.verifyAccessToken(token);
  
  req.user = {
    id: decoded.sub,
    username: decoded.username,
  };
  
  next();
});

module.exports = authMiddleware;
