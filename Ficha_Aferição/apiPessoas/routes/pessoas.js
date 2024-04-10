var express = require('express')
var router = express.Router()
var Pessoa = require('../controllers/pessoa') 

/* GET users listing. */
router.get('/', (req, res) => {
  Pessoa.list()
    .then((data) => {
      res.json(data)
      res.end()
    })
    .catch(e => res.jsonp(e))
})

router.get('/:id', (req, res) => {
  Pessoa.findById(req.params.id)
    .then((data) => {
      res.json(data)
      res.end()
    })
    .catch(e => res.jsonp(e))
})

// INSERT
router.post('/', (req, res) => {
  Pessoa.insert(req.body)
    .then((data) => {
      res.json(data)
      res.end()
    })
    .catch(e => res.jsonp(e))
})

// UPDATE
router.put('/', (req, res) => {
  Pessoa.update(req.body._id, req.body)
    .then((data) => {
      res.json(data)
      res.end()
    })
    .catch(e => res.jsonp(e))
})

// DELETE
router.delete('/', (req, res) => {
  Pessoa.removeById(req.body._id)
    .then((data) => {
      res.json(data)
      res.end()
    })
    .catch(e => res.jsonp(e))
})

router.delete('/:id', (req, res) => {
  Pessoa.removeById(req.params.id)
    .then((data) => {
      res.json(data)
      res.end()
    })
})

module.exports = router 
