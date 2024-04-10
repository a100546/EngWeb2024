var mongoose = require('mongoose')
const { modelName } = require('../models/pessoa')
const Pessoa = require('../models/pessoa');

// Todas as pessoas
module.exports.list = () => {
    return Pessoa
        .find()
        .sort({'nome':1})
        .exec();
}

// GET
module.exports.findById = id => {
    return Pessoa
        .findOne({_id: id})
        .exec()
}

// INSERT
module.exports.insert = pessoa => {
    var newPessoa = new Pessoa(pessoa)
    return newPessoa.save()
}

// DELETE
module.exports.removeById = id => {
    return Pessoa
        .findByIdAndDelete(id)
        .exec()
}

// UPDATE
module.exports.update = (id, pessoa) => {
    return Pessoa
        .findByIdAndUpdate(id, pessoa,{new : true})
        .exec()
}

// GET Modalidades
module.exports.getAllModalidades = () => {
    return Pessoa
            .distinct('desportos')
            .sort({'desportos':1})
            .exec();
}


// GET Atletas por Modalidade
module.exports.getAtletasModalidade = (modalidade) => {
    return Pessoa
            .find({desportos: modalidade})
            .distinct('nome')
            .sort({'nome':1})
            .exec();
}