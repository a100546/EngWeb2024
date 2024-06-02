var express = require('express');
var router = express.Router();
var axios = require('axios');

// GET - Lista de períodos
router.get('/', function (req, res, next) {
    axios.get('http://localhost:3000/periodos?_sort=id')
        .then(resp => {
            res.status(200).render('periodosListPage', { title: "Períodos", periodos : resp.data })
        })
        .catch(erro => {
            res.status(513).render('error', { error: erro })
        })
})

// GET - Adicionar Período
router.get('/adicionar', function (req, res, next) {
    res.status(200).render('periodoAddPage', { title: "Novo Período" })
})

// POST - Adicionar Período
router.post('/adicionar', function (req, res, next) {
    axios.post('http://localhost:3000/periodos', req.body)
        .then(resp => {
            res.status(200).redirect('/periodos')
        })
        .catch(erro => {
            res.status(515).render('error', { error: erro })
        })
})

// GET - Página do Período 
router.get('/:nome', function (req, res, next) {
    axios.get('http://localhost:3000/compositores?_sort=nome')
        .then(resp => {
            var periodo = req.params.nome
            var compositores = resp.data.filter(compositor => compositor.periodo == periodo)
            res.status(200).render('periodoPage', { periodo : periodo, compositores : compositores })
        })
        .catch(erro => {
            res.status(514).render('error', { error: erro })
        })
})

module.exports = router;