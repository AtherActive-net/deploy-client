import fetch from 'node-fetch';

const project = process.argv[2];
const branch = process.argv[3];
const repoCloneUrl = process.argv[4];
const TOKEN = process.argv[5];

const ENV = process.argv[6];

const Url = 'https://deploy.ather.nl/api/v1/deploy';

const body = {
    project: project,
    branch: branch,
    repoCloneUrl: repoCloneUrl,
    ENV: JSON.parse(ENV ? ENV : '{}'),
}

// post request to deploy api
const deploy = async () => {
    checkArgs();
    console.log("[DEPLOY-CLIENT] Deploying...\n")
    const response = await fetch(Url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(body)
    });
    const data = await response.json() as ResponseData;

    if(data.error) {
        console.error(data.stderr);
        throw new Error(data.error);
    }
    console.log(data.output);
}

function checkArgs() {
    if(!project || !branch || !repoCloneUrl || !TOKEN) {
        throw new Error("Missing arguments");
    }
}

deploy();