// Usage:
// $ node env-test.js PERCY_BRANCH [current-brach]
// $ node env-test.js PERCY_PULL_REQUEST [number]
// $ node env-test.js LOG_LEVEL debug
// $ node env-test.js LOG_LEVEL silence
// $ node env-test.js PERCY_GITHUB_ACTION [UA]

let [passedEnv, testValue] = process.argv.slice(2);
let envVar = process.env[passedEnv];

if (envVar !== testValue) {
  console.error(`Expected: ${envVar} \nReceived: ${testValue}`);
  process.exit(1);
} else {
  console.log('Passed!');
}
