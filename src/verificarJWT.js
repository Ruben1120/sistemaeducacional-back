const jwt = require('jsonwebtoken');

const VerificarJWT = (token) => {
    try{
        const payload = jwt.verify(token, process.env.JWT_PASSWORD);
        return payload;
    }catch{
        return false;
    }
}

module.exports = VerificarJWT;