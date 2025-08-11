# Disclaimer: Most of this code is AI generated, don't judge me on it

This is a simple JavaScript project with tests and Datadog Test Optimization integration used for manual QA.

### Local Development with Breakpoints in VSCode

**Assumption:**  
You have a sample project (i.e., this project) that has a dependency on `dd-trace` and runs tests. You want to test changes locally on a branch or debug using breakpoints in VSCode.

### In Your Local Sample Project:

1. Replace `dd-trace`'s version in the `package.json` with `portal:<PATH_TO_YOUR_DD_TRACE_JS_REPO>`, such as:
   ```json
   "dd-trace": "portal:../dd-trace-js"
   ```
   *(Note: This is assuming you are using Yarn version >= 4.0.0. If you're using an older version, use `yarn link` instead.)*

2. Run `yarn install` to install dependencies.

3. Run your tests with Test Optimization instrumentation and pass `--inspect-brk` to your `NODE_OPTIONS`, like so:
   ```bash
   NODE_OPTIONS="-r $(pwd)/.pnp.cjs -r dd-trace/ci/init --inspect-brk" yarn jest
   ```
   The test execution will pause at the first line of the script, waiting for you to attach to the debugger.

### In Your `dd-trace-js` Project:

1. Open the command palette in VSCode (Cmd + Shift + P).

2. Search for `Debug: Attach to Node Process` and select the process that corresponds to your running tests.

The execution should now stop at the breakpoints you've set in your code.
