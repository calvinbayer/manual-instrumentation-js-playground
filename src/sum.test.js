const sum = require("./sum");

/**
 * Returns the GitHub Actions job URL for the current job.
 * 
 * Note: GitHub does not provide a direct environment variable for the job ID.
 * To get the job ID, you need to use the GitHub REST API.
 * This function fetches the job ID for the current job using the workflow run and job name.
 */
const https = require('https');

async function getGithubJobUrl() {
    const repo = process.env.GITHUB_REPOSITORY; // e.g. "org/repo"
    const runId = process.env.GITHUB_RUN_ID; // e.g. "12345"
    const jobName = process.env.GITHUB_JOB; // e.g. "build"
    const token = process.env.GITHUB_TOKEN;

    if (!repo || !runId || !jobName || !token) {
        throw new Error("Missing required GitHub Actions environment variables.");
    }

    // Fetch jobs for the workflow run
    const [owner, repoName] = repo.split('/');
    const options = {
        hostname: 'api.github.com',
        path: `/repos/${owner}/${repoName}/actions/runs/${runId}/jobs`,
        method: 'GET',
        headers: {
            'User-Agent': 'node.js',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json'
        }
    };

    const jobsData = await new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`GitHub API responded with status ${res.statusCode}: ${data}`));
                }
            });
        });
        req.on('error', reject);
        req.end();
    });

    // Find the job with the current job name
    const job = jobsData.jobs.find(j => j.name === jobName);
    if (!job) {
        throw new Error(`Job with name "${jobName}" not found in workflow run ${runId}`);
    }
    const jobId = job.id;

    return `https://github.com/${repo}/actions/runs/${runId}/job/${jobId}`;
}



describe("sum", () => {
    it("should return the sum of two numbers", async () => {
        const testSpan = require('dd-trace').scope().active()
        testSpan.setTag('github_job_url', await getGithubJobUrl())
        expect(sum(1, 2)).toBe(3);
    });
})