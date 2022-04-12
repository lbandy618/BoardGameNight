const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:16284';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/User",
      "/api/Session",
      "/api/Preferences",
      "/api/GameShelf",
      "/api/Event"

   ],
    target: target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
