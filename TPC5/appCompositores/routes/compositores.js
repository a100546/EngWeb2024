var express = require('express');
var router = express.Router();
var axios = require('axios');


// GET - Lista de compositores
router.get('/', function (req, res, next) {
  axios.get('http://localhost:3000/compositores?_sort=nome')
    .then(resp => {
      res.status(200).render('compositoresListPage', { title : "Compositores", compositores : resp.data })
    })
    .catch(erro => {
      res.status(501).render('error', { error: erro })
    })
})

// GET - Editar Compositor
router.get('/editar/:id', function (req, res, next) {
  axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then(resp => {
      res.status(200).render('compositorEditPage', { title : "Editar Compositor", compositor : resp.data })
    })
    .catch(erro => {
      res.status(503).render('error', { error: erro })
    })
})

// GET - Adicionar Compositor
router.get('/adicionar', function (req, res, next) {
  res.status(200).render('compositorAddPage', { title: "Novo Compositor" })
})

// GET Apagar Compositor 
router.get('/eliminar/:id', function (req, res, next) {
  axios.delete('http://localhost:3000/compositores/' + req.params.id)
    .then(resp => {
      res.status(200).redirect('/compositores')
    })
    .catch(erro => {
      res.status(512).render('error', { error: erro })
    })
})

// GET - Página do Compositor
router.get('/:id', function (req, res, next) {
  axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then(resp => {
      res.status(200).render('compositorPage', { title : resp.data.nome, compositor : resp.data })
    }).catch(erro => {
      res.status(502).render('error', { error: erro })
    })
})

// POST - Editar Compositor
router.post('/editar/:id', function (req, res, next) {
  axios.get('http://localhost:3000/periodos?id=' + req.body.periodo)
    .then(resp => {
      if (resp.data != "") {
        axios.put('http://localhost:3000/compositores/' + req.params.id, req.body)
          .then(resp => {
            res.status(200).redirect('/compositores/' + req.params.id)
          })
          .catch(erro => {
            res.status(504).render('error', { error: erro })
          })
      } else {
        axios.post('http://localhost:3000/periodos', { "id": req.body.periodo })
          .then(resp => {
            axios.put('http://localhost:3000/compositores/' + req.params.id, req.body)
              .then(resp => {
                res.status(200).redirect('/compositores/' + req.params.id)
              })
              .catch(erro => {
                res.status(505).render('error', { error: erro })
              })
          })
          .catch(erro => {
            res.status(506).render('error', { error: erro })
          })
      }
    })
    .catch(erro => {
      res.status(507).render('error', { error: erro })
    })
})

// POST - Adicionar Compositor
router.post('/adicionar', function (req, res, next) {
  axios.get('http://localhost:3000/periodos?id=' + req.body.periodo)
    .then(resp => {
      if (resp.data != "") {
        axios.post('http://localhost:3000/compositores', req.body)
          .then(resp => {
            res.status(200).redirect('/compositores/' + req.body.id)
          })
          .catch(erro => {
            res.status(508).render('error', { error: erro })
          })
      } else {
        axios.post('http://localhost:3000/periodos', { "id": req.body.periodo })
          .then(resp => {
            axios.post('http://localhost:3000/compositores', req.body)
              .then(resp => {
                res.status(200).redirect('/compositores/' + req.body.id)
              })
              .catch(erro => {
                res.status(509).render('error', { error: erro })
              })
          })
          .catch(erro => {
            res.status(510).render('error', { error: erro })
          })
      }
    })
    .catch(erro => {
      res.status(511).render('error', { error: erro })
    })
})

module.exports = router;