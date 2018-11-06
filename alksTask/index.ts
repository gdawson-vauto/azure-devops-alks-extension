import tl = require('azure-pipelines-task-lib/task');
import alks = require('alks-node');

async function run() {
    try {
        const alksAccount: string = tl.getInput('alksAccount', true);
        const alksRole: string = tl.getInput('alksRole', true);
        const alksIam: boolean = Boolean(tl.getInput('alksIam', true));
        const sessionTime: number = alksIam ? 1 : Number(tl.getInput('alksSessionTime'));
        const server: string = tl.getInput('alksServer', true);
        const userid: string = tl.getInput('alksUserId', true);
        const password: string = tl.getInput('alksPassword', true);

        if (sessionTime < 1 || sessionTime > 24) {
            tl.setResult(tl.TaskResult.Failed, "Session time must be between 1 and 24 hours.");
            return;
        }

        var data = {
            alksAccount: alksAccount,
            alksRole: alksRole,
            server: server,
            userid: userid,
            password: password
        };

        var auth = {password: password};

        if (alksIam) {
            alks.createIamKey(alksAccount, auth, {debug: true}, (err: any, key: any) => {
                if (err) console.error(err);
                else setAlksAwsVariables(key);
            });
        }
        else
        {
            alks.createKey(data, auth, sessionTime, {debug: true}, (err: any, key: any) => {
                if (err) console.error(err);
                else setAlksAwsVariables(key);
            });
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

function setAlksAwsVariables(key: any) {
    console.log(JSON.stringify(key));
    var obj = JSON.parse(JSON.stringify(key));

    // Set task variables named AWS.AccessKeyID, AWS.SecretAccessKey,
    // and AWS.SessionToken so that AWS Tools and CLI commands that
    // occur later in the pipeline will work.
    tl.setVariable("AWS.AccessKeyID", obj.accessKey);
    tl.setVariable("AWS.SecretAccessKey", obj.secretKey);
    tl.setVariable("AWS.SessionToken", obj.sessionToken);

    tl.setVariable("AWS_ACCESS_KEY_ID", obj.accessKey);
    tl.setVariable("AWS_SECRET_ACCESS_KEY", obj.secretKey);
    tl.setVariable("AWS_SESSION_TOKEN", obj.sessionToken);
}

run();