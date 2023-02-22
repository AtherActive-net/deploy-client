var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
};
// post request to deploy api
const deploy = () => __awaiter(void 0, void 0, void 0, function* () {
    checkArgs();
    console.log("[DEPLOY-CLIENT] Deploying...\n");
    const response = yield fetch(Url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(body)
    });
    const data = yield response.json();
    if (data.error) {
        console.error(data.stderr);
        throw new Error(data.error);
    }
    console.log(data.output);
});
function checkArgs() {
    console.log(project);
    console.log(branch);
    console.log(repoCloneUrl);
    console.log(TOKEN);
    if (!project || !branch || !repoCloneUrl || !TOKEN) {
        throw new Error("Missing arguments");
    }
}
deploy();
