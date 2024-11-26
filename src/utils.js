const https = require("https");

const agent = new https.Agent({ family: 4 });

const ensureHttps = (url) =>
  url.startsWith("https://") ? url : url.replace(/^http:\/\//, "https://");

const dynamicDelay = (depth, baseDelay = 100, increment = 50) => {
  return new Promise((resolve) =>
    setTimeout(resolve, baseDelay + depth * increment)
  );
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

module.exports = { ensureHttps, dynamicDelay, isValidUrl, agent };
