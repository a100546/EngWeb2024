var Compositor = require('../models/compositores')

module.exports.list = () => {
    return Compositor
            .find()
            .sort({ nome: 1 })
            .exec()
}

module.exports.findById = (idCompositor) => {
    return Compositor
            .findOne({ _id: idCompositor })
            .exec()
}

module.exports.findByPeriodo = (periodo) => {
    return Compositor
        .find({periodo: periodo})
        .exec();
}

module.exports.insert = (compositor) => {
    return Compositor.create(compositor)
}

module.exports.removeById = (idCompositor) => {
    return Compositor
            .deleteOne({_id : idCompositor})
            .exec()
}

module.exports.update = (id, compositor) => {
    return Compositor.findByIdAndUpdate(id, compositor)
}