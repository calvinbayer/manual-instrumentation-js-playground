const http = require("http");

function sumLocal(a, b) {
  return a + b;
}

function sumRemote(a, b, baseUrl) {
  return new Promise((resolve, reject) => {
    const url = new URL("/sum", baseUrl);
    url.searchParams.set("a", String(a));
    url.searchParams.set("b", String(b));

    const request = http.get(url, (response) => {
      let data = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => (data += chunk));
      response.on("end", () => {
        try {
          if (response.statusCode !== 200) {
            return reject(new Error(`Request failed with status ${response.statusCode}`));
          }
          const parsed = JSON.parse(data);
          return resolve(parsed.result);
        } catch (error) {
          return reject(error);
        }
      });
    });
    request.on("error", reject);
  });
}

function sum(a, b) {
  const baseUrl = process.env.SUM_SERVER_URL;
  if (!baseUrl) {
    return sumLocal(a, b);
  }
  return sumRemote(a, b, baseUrl);
}

module.exports = sum;