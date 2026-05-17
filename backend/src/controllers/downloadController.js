const downloadService = require('../services/downloadService');
const ApiResponse = require('../utils/ApiResponse');
const catchAsync = require('../utils/catchAsync');

const startDownload = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const download = await downloadService.startDownload(userId, req.body);
  ApiResponse.success(res, download, 'Download initialized', 201);
});

const getDownloads = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const downloads = await downloadService.getUserDownloads(userId);
  ApiResponse.success(res, downloads);
});

const updateStatus = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const download = await downloadService.updateDownloadStatus(id, userId, req.body);
  ApiResponse.success(res, download);
});

const removeDownload = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  await downloadService.removeDownload(id, userId);
  ApiResponse.success(res, null, 'Download removed');
});

module.exports = {
  startDownload,
  getDownloads,
  updateStatus,
  removeDownload,
};
