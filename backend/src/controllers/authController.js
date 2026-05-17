const userService = require('../services/userService');
const authService = require('../services/authService');
const ApiResponse = require('../utils/ApiResponse');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await userService.findByEmail(email);
  if (existingUser) {
    throw new ApiError(400, 'Email already registered');
  }

  const passwordHash = await authService.hashPassword(password);
  const user = await userService.createUser({ username, email, passwordHash });

  const { accessToken, refreshToken } = authService.generateTokens(user);
  
  // In a real app, hash refresh token before storing
  await userService.createSession(user.id, refreshToken, req.headers['user-agent'], req.ip);

  ApiResponse.success(res, { user, accessToken, refreshToken }, 'User registered successfully', 201);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.findByEmail(email);
  if (!user || !(await authService.verifyPassword(user.password_hash, password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const { accessToken, refreshToken } = authService.generateTokens(user);
  await userService.createSession(user.id, refreshToken, req.headers['user-agent'], req.ip);

  // Remove sensitive data
  delete user.password_hash;

  ApiResponse.success(res, { user, accessToken, refreshToken }, 'Logged in successfully');
});

const refresh = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  const decoded = authService.verifyRefreshToken(refreshToken);
  
  const user = await userService.findById(decoded.sub);
  if (!user) {
    throw new ApiError(401, 'User not found');
  }

  const tokens = authService.generateTokens(user);
  ApiResponse.success(res, tokens);
});

const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  if (req.user && refreshToken) {
    await userService.revokeSession(req.user.id, refreshToken);
  }
  ApiResponse.success(res, null, 'Logged out successfully');
});

module.exports = {
  register,
  login,
  refresh,
  logout,
};
