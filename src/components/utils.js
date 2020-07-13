
const crypto = require('crypto');

class Utils {

    generateUsernameFromRequest(req) {
        let did = req.auth.user;
        let applicationName = req.headers['application-name'];
        return this.generateUsername(did, applicationName);
    }

    generateUsername(did, applicationName) {
        let hash = crypto.createHmac('sha1', process.env.HASH_KEY);
        hash.update(did + "/" + applicationName);

        // Username must start with a letter
        return "v" + hash.digest('hex');
    }

    didsToUsernames(dids, applicationName) {
        if (!dids || !dids.length) {
            return [];
        }

        let usernames = [];
        for (var d in dids) {
            let did = dids[d];
            usernames.push(this.generateUsername(did, applicationName));
        }

        return usernames;
    }

}

let utils = new Utils();
export default utils;