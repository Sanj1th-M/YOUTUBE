const config = require('./index');

module.exports = {
  cors: {
    origin: config.env === 'production' 
      ? ['https://youtube-platform.com'] // Example production domain
      : ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24 hours
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  auth: {
    password: {
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    },
    jwt: {
      accessExpirationMinutes: 30,
      refreshExpirationDays: 30,
    }
  },
  ssrf: {
    whitelist: [
      'piped.video',
      'piped-api.kavin.rocks',
      'pipedapi.moomoo.me',
      'pipedapi.synced.cloud',
      'pipedapi.adminforu.de',
      'pipedapi.drgns.space',
      'api-piped.mha.fi',
      'pipedapi.rivo.cc',
      'pipedapi.lunar.icu',
    ],
    allowedProtocols: ['http:', 'https:'],
  }
};
