const tracer = require('dd-trace').init({
    logInjection: true,
    env: "development",
    service: "sum-service-tests"
})
const { runCLI } = require('jest');

async function main() {
  const projectRoot = process.cwd();

  await runCLI(
    {
      testMatch: ['**/sum.test.js'],
    },
    [projectRoot]
  );
}

main();
