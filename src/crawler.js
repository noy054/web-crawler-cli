const axios = require("axios");
const { JSDOM } = require("jsdom");
const { ensureHttps, dynamicDelay, agent } = require("./utils");

const visitedUrls = new Set();
const results = [];

const fetchWithRetry = async (url, retries = 3) => {
  try {
    return await axios.get(url, {
      httpsAgent: agent,
      headers: {
        "User-Agent": "Mozilla/5.0 ... Chrome/91.0 Safari/537.36",
        Referer: "https://www.google.com/",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying ${url} (${3 - retries + 1})...`);
      return fetchWithRetry(url, retries - 1);
    }
    return null;
  }
};

const extractImages = (document, sourceUrl, depth) => {
  const images = [...document.querySelectorAll("img")].map((img) => img.src);
  if (images.length > 0) {
    results.push(
      ...images.map((imageUrl) => ({
        imageUrl,
        sourceUrl,
        depth,
      }))
    );
  }
};

const extractLinks = (document) =>
  [...document.querySelectorAll("a")]
    .map((a) => a.href)
    .filter((link) => link.startsWith("http"));

const crawl = async (startUrl, maxDepth) => {
  const queue = [{ url: ensureHttps(startUrl), depth: 0 }];

  while (queue.length) {
    const { url, depth } = queue.shift();
    if (depth > maxDepth || visitedUrls.has(url)) continue;

    visitedUrls.add(url);

    const response = await fetchWithRetry(url);
    if (!response) continue;

    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    extractImages(document, url, depth);

    if (depth < maxDepth) {
      const links = extractLinks(document);
      links.forEach((link) =>
        queue.push({ url: ensureHttps(link), depth: depth + 1 })
      );
    }

    await dynamicDelay(depth);
  }

  return results;
};

module.exports = { crawl };
