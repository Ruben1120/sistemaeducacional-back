const verificarJWT = require("../verificarJWT");
const knex = require("../connectionBD");

async function store(request, response) {
    const { authorization: jwt } = request.headers;
    const payload = verificarJWT(jwt);
    if(!payload) return response.status(500).json({sucess: false, erro: "nao autorizado"});

    try{
        await knex("aulas").insert({...request.body});
        return response.status(200).json({});
    }catch(err){
        console.log(err);
        return response.status(500).json({});
    };
}

async function index(request, response) {
    const { authorization: jwt } = request.headers;
    const payload = verificarJWT(jwt);
    if(!payload) return response.status(500).json({sucess: false, erro: "nao autorizado"});

    try{
        const aulas = await knex("aulas").select("*");
        return response.status(200).json([...aulas]);
    }catch(err){
        console.log(err);
        return response.status(500).json({});
    };
}

async function remove(request, response) {
    const { authorization: jwt } = request.headers;
    const payload = verificarJWT(jwt);
    if(!payload) return response.status(500).json({sucess: false, erro: "nao autorizado"});

    try{
        const {id} = request.params;
        await knex("aulas").delete().where({id});
        return response.status(200).json();
    }catch(err){
        console.log(err);
        return response.status(500).json({});
    };
}

async function show(request, response) {
    const { authorization: jwt } = request.headers;
    const payload = verificarJWT(jwt);
    if(!payload) return response.status(500).json({sucess: false, erro: "nao autorizado"});

    try{
        const {id} = request.params;
        const aula = await knex("aulas").select("*").where({id}).limit(1).first();
        return response.status(200).json({...aula});
    }catch(err){
        console.log(err);
        return response.status(500).json({});
    };
}

async function update(request, response) {
    const { authorization: jwt } = request.headers;
    const payload = verificarJWT(jwt);
    if(!payload) return response.status(500).json({sucess: false, erro: "nao autorizado"});

    const {id} = request.params;
    try{
        await knex("aulas").update({...request.body}).where({id});
        return response.status(200).json({});
    }catch(err){
        console.log(err);
        return response.status(500).json({});
    };
}
module.exports = {
    store,
    index,
    remove,
    show,
    update
}