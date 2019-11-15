const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const io = require('@actions/io');
const pkg = require('./package.json');

// Sets the required env info for Percy to work correctly
function setPercyBranchBuildInfo(pullRequestNumber) {
  if (!!pullRequestNumber) {
    let prBranch = github.context.payload.pull_request.head.ref;

    core.exportVariable('PERCY_BRANCH', prBranch);
    core.exportVariable('PERCY_PULL_REQUEST', pullRequestNumber);
  } else {
    core.exportVariable('PERCY_BRANCH', github.context.payload.ref.replace('refs/heads/', ''));
  }
}

(async () => {
  try {
    let flags = core.getInput('exec-flags');
    let testCommand = core.getInput('command');
    let isDebug = core.getInput('verbose') === 'true';
    let isSilenced = core.getInput('silence') === 'true';
    let pullRequestNumber = github.context.payload.number;
    let actionUserAgent = `${pkg.name}/${pkg.version}`;

    // Set the CI builds user agent
    core.exportVariable('PERCY_GITHUB_ACTION', actionUserAgent);

    if (isSilenced) {
      core.exportVariable('LOG_LEVEL', 'silence');
    }

    if (isDebug) {
      core.exportVariable('LOG_LEVEL', 'debug');
    }

    setPercyBranchBuildInfo(pullRequestNumber);

    if (testCommand) {
      let npxPath = await io.which('npx', true);

      // Run the passed command with `percy exec` to create a Percy build
      await exec.exec(`"${npxPath}" percy exec ${flags} -- ${testCommand}`);

      return;
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
