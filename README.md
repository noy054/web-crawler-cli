# Web Crawler CLI

A lightweight and efficient web crawler CLI tool built with Node.js. This tool scans webpages for images, recursively follows links, and stops once a specified depth is reached. The results are saved in a structured JSON file for further analysis.

---

## Features

- Extracts all image URLs (`<img>` tags) from webpages.
- Follows valid links (`<a>` tags) recursively up to a user-defined depth.

# Web Crawler CLI

This project is a modular and efficient web crawler built with Node.js. The tool scans webpages for images, follows links recursively up to a specified depth, and stores the results in a structured JSON file. It uses a clean architecture with separate modules for improved maintainability.

---

## Project Structure

```
project-root/
├── src/
│   │   └── crawler.js     # Core crawling logic
│   │   └── utils.js       # Helper functions (e.g., URL validation, delays)
├── main.js                # Entry point for the application
└── README.md              # Project documentation
```

---

## Features

- Extracts all image URLs (`<img>` tags) from webpages.
- Follows valid links (`<a>` tags) recursively up to a user-defined depth.
- Saves results in a `results.json` file.
- Modular architecture:
  - **Crawler module**: Handles the crawling process.
  - **Utils module**: Provides helper functions for URL validation, delays, etc.
- Implements retry logic for failed requests.
- Handles rate-limiting using dynamic delays.

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/web-crawler-cli.git
   cd web-crawler-cli
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## Usage

Run the crawler using the main entry point:

```bash
node main.js <url> <depth>
```

### Parameters:

- `<url>`: The starting URL for the crawl (must include `http://` or `https://`).
- `<depth>`: The maximum depth of links to follow (non-negative integer).

### Example:

```bash
node main.js https://example.com 2
```

This command crawls `https://example.com` and recursively follows links up to a depth of 2.

---

## Output

The crawler generates a `results.json` file in the root directory with the following structure:

```json
{
  "results": [
    {
      "imageUrl": "https://example.com/image1.jpg",
      "sourceUrl": "https://example.com",
      "depth": 0
    },
    {
      "imageUrl": "https://example.com/image2.jpg",
      "sourceUrl": "https://example.com/about",
      "depth": 1
    }
  ]
}
```

### Fields:

- `imageUrl`: The URL of the image found.
- `sourceUrl`: The page URL where the image was found.
- `depth`: The depth level of the page relative to the starting URL.

---

## Error Handling

- **Retries**: Retries failed requests up to 3 times before skipping.
- **Invalid URLs**: Skips invalid or unreachable URLs.
- **No Links/Images**: Logs when no links or images are found on a page.

---

## Customization

- **Dynamic Delays**: Adjust delays based on depth in the `dynamicDelay` function located in `src/utils/utils.js`:
  ```javascript
  const dynamicDelay = (depth) => {
    const baseDelay = 100; // Base delay in milliseconds
    const increment = depth * 50; // Add 50ms per depth level
    return new Promise((resolve) => setTimeout(resolve, baseDelay + increment));
  };
  ```

---

## Known Issues and Limitations

1. **JavaScript-Rendered Content**:

   - Pages relying heavily on JavaScript may not fully load since the crawler uses `JSDOM`.

2. **Deep Crawls**:

   - Crawling large websites with deep links can take time and consume memory.

3. **Rate-Limiting**:
   - Ensure the delay is adjusted based on the website's tolerance to avoid being blocked.

---

## Roadmap

- Add support for JavaScript-rendered pages using Puppeteer.
- Implement a whitelist or blacklist for filtering links.
- Introduce concurrency for faster crawling.

---

## License

This project is licensed under the MIT License.

- Saves the results in `results.json` with details about images, their source pages, and depth levels.
- Implements retry logic for failed requests.
- Handles rate-limiting using dynamic delays.

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/web-crawler-cli.git
   cd web-crawler-cli
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## Usage

Run the crawler with the following command:

```bash
node crawler.js <url> <depth>
```

### Parameters:

- `<url>`: The starting URL for the crawl (must include `http://` or `https://`).
- `<depth>`: The maximum depth of links to follow (non-negative integer).

### Example:

```bash
node crawler.js https://example.com 2
```

This command crawls `https://example.com` and recursively follows links up to a depth of 2.

---

## Output

The crawler generates a `results.json` file in the root directory with the following structure:

```json
{
  "results": [
    {
      "imageUrl": "/_img/2022/iana-logo-header.svg",
      "sourceUrl": "https://www.iana.org/domains/example",
      "depth": 1
    },
    {
      "imageUrl": "/assets/icann_logo-060b2be98ed365541773152e2d7bb0ce5777c299d04fce4d89a14bc8fbc2a14a.png",
      "sourceUrl": "https://www.icann.org/privacy/policy",
      "depth": 2
    },
    {
      "imageUrl": "/assets/icann_logo-060b2be98ed365541773152e2d7bb0ce5777c299d04fce4d89a14bc8fbc2a14a.png",
      "sourceUrl": "https://www.icann.org/privacy/tos",
      "depth": 2
    }
  ]
}
```

### Fields:

- `imageUrl`: The URL of the image found.
- `sourceUrl`: The page URL where the image was found.
- `depth`: The depth level of the page relative to the starting URL.

---

## Error Handling

- **Retries**: The crawler retries failed requests up to 3 times before skipping.
- **Invalid URLs**: Skips invalid or unreachable URLs.
- **No Links/Images**: Logs when no links or images are found on a page.

---

## Customization

- **Dynamic Delays**: Adjust delays based on depth in the `dynamicDelay` function:
  ```javascript
  const dynamicDelay = (depth) => {
    const baseDelay = 100; // Base delay in milliseconds
    const increment = depth * 50; // Add 50ms per depth level
    return new Promise((resolve) => setTimeout(resolve, baseDelay + increment));
  };
  ```

---

## Known Issues and Limitations

1. **JavaScript-Rendered Content**:

   - Pages relying heavily on JavaScript may not fully load since the crawler uses `JSDOM`.

2. **Deep Crawls**:

   - Crawling large websites with deep links can take time and consume memory.

3. **Rate-Limiting**:
   - Ensure the delay is adjusted based on the website's tolerance to avoid being blocked.

---

## Roadmap

- Add support for JavaScript-rendered pages using Puppeteer.
- Implement a whitelist or blacklist for filtering links.
- Introduce concurrency for faster crawling.

---

## License

This project is licensed under the MIT License.
