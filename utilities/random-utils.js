const crypto = require('crypto');

module.exports.getRandomHexString = async (length) => {
    let buf = await crypto.randomBytes(Math.ceil(length / 2));
    return buf.toString('hex').substring(0, length);
};
