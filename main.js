const fs = require("fs");
const { crawl } = require("./src/crawler");
const { isValidUrl } = require("./src/utils");

const main = async () => {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.error("Usage: node main.js <url> <depth>");
    process.exit(1);
  }

  const [url, depth] = args;
  const maxDepth = parseInt(depth, 10);

  if (!isValidUrl(url) || isNaN(maxDepth) || maxDepth < 0) {
    console.error("Invalid URL or depth provided.");
    process.exit(1);
  }

  console.log(`Starting crawl at ${url} with depth ${maxDepth}...`);
  const results = await crawl(url, maxDepth);

  fs.writeFileSync("results.json", JSON.stringify({ results }, null, 2));
  console.log("Crawling complete. Results saved to results.json");
};

main();
