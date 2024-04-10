var express = require('express')
var router = express.Router()
const Pessoa = require("../controllers/pessoa")


router.get('/', (req, res) => {
    Pessoa.getAllModalidades()
        .then((data) => {
            res.json(data)
            res.end()
        })
        .catch(e => res.jsonp(e))
})

router.get('/:modalidade', (req, res) => {
    Pessoa.getAtletasModalidade(req.params.modalidade)
        .then((data) => {
            res.json(data)
            res.end()
        })
        .catch(e => res.jsonp(e))
})

module.exports = router