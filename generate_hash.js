// Import libraries
const bcrypt = require('bcryptjs');
const { createHmac } = require('crypto');
require('dotenv').config()
const env = process.env

/** getHash() - function that generates and return hash value synchronously */
function getHash(password) {

    // Attach the peppers as head and tail of the password
    var peppered_password = `${env.PEPPER_HEAD}${password}${env.PEPPER_TAIL}`;
    
    // Convert peppered password (SHA512 algorithm, base64 encoding)
    var hmac_password = createHmac('sha512', env.HMAC_KEY)
        .update(peppered_password)
        .digest("base64");
    
    // Generate Salt
    var salt = bcrypt.genSaltSync(parseInt(env.SALT_ROUNDS));
    
    // Generate Hash
    var hash = bcrypt.hashSync(hmac_password, salt);

    // Print the passwords from cleartext to hashed
    console.log("Password: " + password);
    console.log("Peppered password: " + peppered_password);
    console.log("HMAC password: " + hmac_password);
    console.log("Salt: " + salt);
    console.log("Hash: " + hash);

    // Return hash value
    return hash;
}

getHash("MyPassword")

