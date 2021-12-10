// Import libraries
const bcrypt = require('bcryptjs');
const { createHmac } = require('crypto');
require('dotenv').config()
const env = process.env

/** 
 * verifyPassword() - function that checks the password and hashed password if matched
 * it will return true if matched otherwise false
 */
function verifyPassword(password, hash) {

    // Attach the peppers as head and tail of the password
    var peppered_password = `${env.PEPPER_HEAD}${password}${env.PEPPER_TAIL}`;
    
    // Convert peppered password with SHA512 algorithm
    var hmac_password = createHmac('sha512', env.HMAC_KEY)
        .update(peppered_password)
        .digest("base64");
    
    // Return true if matched else false
    return bcrypt.compareSync(hmac_password, hash);
}

verifyPassword("MyPassword", "$2a$10$zXf7NlFU5ZCL0ucEV7h46e4zrlkwmaTVHkkMyDdQd1MSwXbrY3Km6") 
    ? console.log("It's a match!") 
    : console.log("Not a match");