require('dd-trace').init({
    logInjection: true,
    env: "development",
    service: "sum-service-tests"
})
const sum = require("./sum");

describe("sum integration with express server", () => {
    it("returns the sum from the server", async () => {
        await expect(sum(10, 15)).resolves.toBe(25);
    });

    it("returns 400 for invalid numbers", async () => {
        // When server fails, our client rejects the promise.
        await expect(sum("abc", 5)).rejects.toThrow(/Request failed/);
    });
});


