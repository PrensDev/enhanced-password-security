var bcrypt = require('bcryptjs');
const { randomBytes, createHmac } = require('crypto');
require('dotenv').config()


function verifyPassword(password, hash) {
    
    const real_hash = `$2a$${process.env.SALT_ROUNDS}$${hash}`

    // Attach the peppers as head and tail of the password
    var peppered_password = `${process.env.PEPPER_HEAD}${password}${process.env.PEPPER_TAIL}`;
    
    // Convert peppered password with SHA512 algorithm
    var hmac_password = createHmac('sha512', process.env.HMAC_KEY)
        .update(peppered_password)
        .digest("base64");
    
    // Return true if matched else false
    return bcrypt.compareSync(hmac_password, real_hash);
}

verifyPassword("MyPassword", "ZK.0eqyio.tP8MTaP5lcIOL1s5em/aQYnTqPLnhCGQ5tCr/3OF6ie") 
    ? console.log("It's a match!") 
    : console.log("Not a match");