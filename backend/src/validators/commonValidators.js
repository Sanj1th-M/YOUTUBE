const { z } = require('zod');

/**
 * Common Zod Validators
 */

const videoId = z.string().min(1).max(50).regex(/^[a-zA-Z0-9_-]+$/);

const pagination = z.object({
  page: z.string().optional().transform(v => parseInt(v, 10) || 1),
  limit: z.string().optional().transform(v => parseInt(v, 10) || 20),
});

const searchSchema = z.object({
  query: z.object({
    q: z.string().min(1).max(100),
    filter: z.enum(['all', 'video', 'channel', 'playlist']).optional().default('all'),
  }),
});

const watchSchema = z.object({
  params: z.object({
    id: videoId,
  }),
});

module.exports = {
  videoId,
  pagination,
  searchSchema,
  watchSchema,
};
