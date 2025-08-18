require('dd-trace').init({
    logInjection: true,
    env: "development",
    service: "sum-service-tests"
})
const sum = require("./sum");

describe("sum", () => {
    it("should return the sum of two numbers", () => {
        expect(sum(1, 2)).toBe(3);
    });
})