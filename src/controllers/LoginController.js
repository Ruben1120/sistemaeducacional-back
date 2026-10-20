const knex = require('../connectionBD');
const verificarJWT = require('../verificarJWT');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function Login(request, response) {
    const { email, senha } = request.body;
    
    let erro = false;
    const admin = await knex("usuarios").where({email}).select("id", "email", "nome", "senha").catch(
        (err) => {
            console.log((new Date().toString())+" - "+err);
            erro = true;
        }
    );
    
    if(erro){
        return response.status(500).json({sucess: false, erro: "falha fatal"});
    }

    if(admin.length > 0){
        if(await bcrypt.compare(senha, admin[0].senha)){
            const token_jwt = jwt.sign({ id: admin[0].id, email}, process.env.JWT_PASSWORD, { expiresIn: "24h"});
            return response.status(200).json({sucess: true, token_jwt, nome: admin[0].nome, id: admin[0].id});
        }else{
            console.log((new Date().toString())+` - Tentativa de login falha com o e-mail ${email} pelo o endereço ${request.connection.remoteAddress}`);
            return response.status(404).json({sucess: false, erro: "nao encontrado"});
        }
    }else{
        console.log((new Date().toString())+` - Tentativa de login falha com o e-mail ${email} pelo o endereço ${request.connection.remoteAddress}`);
        return response.status(404).json({sucess: false, erro: "nao encontrado"});
    }
}

module.exports = Login;