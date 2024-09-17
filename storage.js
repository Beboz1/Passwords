const fs = require('fs');
const path = require('path');
const { encrypt, decrypt } = require('./encryption');

const filePath = path.join(__dirname, 'passwords.json');

const savePassword = (service, password) => {
    const encryptedPassword = encrypt(password);
    let data = {};
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath));
    }
    data[service] = encryptedPassword;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const getPassword = (service) => {
    if (!fs.existsSync(filePath)) return null;
    const data = JSON.parse(fs.readFileSync(filePath));
    if (!data[service]) return null;
    return decrypt(data[service]);
};

module.exports = { savePassword, getPassword };
