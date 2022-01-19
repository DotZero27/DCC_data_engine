const fs = require("fs");
const basePath = process.cwd();
const buildDir = `${basePath}/build`;

const NETWORK = 'sol'

const buildSetup = () => {
    if (fs.existsSync(buildDir)) {
        fs.rmdirSync(buildDir, { recursive: true });
    }
    fs.mkdirSync(buildDir);
    fs.mkdirSync(`${buildDir}/json`);
    fs.mkdirSync(`${buildDir}/images`);
};

const expeller = (job, data) => {
    const result = data.filter((e) => {
        if (e.jobName === job.jobName) {
            return e
        }
    })
    data[data.indexOf(result[0])].workers -= 1
}

const startCreating = async () => {
}
module.exports = { startCreating, buildSetup };