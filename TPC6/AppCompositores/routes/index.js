var express = require('express')
var router = express.Router()

const Compositor = require('../controllers/compositores')

function getPeriodos(comps) {
    const periodos = [];
    for(const comp of comps) {
      if (!periodos.includes(comp.periodo)) {
        periodos.push(comp.periodo);
      }
    }
    return periodos
}

function getCompositoresByPeriodo(comps, periodo) {
    const compositores = [];
    for(const comp of comps) {
      if (comp.periodo == periodo) {
        compositores.push(comp.nome)
      }
    }
    return compositores.sort()
  }
  
router.get('/', function(req, res, next) {
  res.render('indexPage', { title: 'Compositores' })
})

/* GET Lista de compositores */
router.get('/compositores', function (req, res, next) {
    Compositor.list()
        .then(compositores => {
            res.status(200).render('compositoresListPage', { title: "Compositores", compositores: compositores });
        }).catch(erro => {
            res.status(501).render('error', { error: erro })
        })
})

/* GET Editar Compositor */
router.get('/compositores/editar/:id', function (req, res, next) {
    Compositor.findById(req.params.id)
    .then(compositor => {
        res.status(200).render('compositorEditPage', { title: "Editar Compositor", compositor: compositor });
    }).catch(erro => {
        res.status(502).render('error', { error: erro })
    })
})

/* GET Adicionar Compositor */
router.get('/compositores/adicionar', function (req, res, next) {
    res.status(200).render('compositorAddPage', { title: "Novo Compositor" });
})

/* GET Apagar Compositor */
router.get('/compositores/eliminar/:id', function (req, res, next) {
    Compositor.removeById(req.params.id)
    .then(resp => {
        res.status(200).redirect('/compositores');
    }).catch(erro => {
        res.status(503).render('error', { error: erro })
    })
})

/* GET Página do Compositor */
router.get('/compositores/:id', function (req, res, next) {
    Compositor.findById(req.params.id)
    .then(compositor => {
        res.status(200).render('compositorPage', { title: compositor.nome, compositor: compositor });
    }).catch(erro => {
        res.status(504).render('error', { error: erro })
    })
})

/* POST Editar Compositor */
router.post('/compositores/editar/:id', function (req, res, next) {
    Compositor.update(req.params.id, req.body)
    .then(() => {
      res.redirect("/compositores/" + req.params.id);
    })
    .catch((erro) => {
      res.render('error', { error: erro })
    })
})

/* POST Adicionar Compositor */
router.post('/compositores/adicionar', function (req, res, next) {
    Compositor.insert(req.body)
    .then(() => {
        res.redirect("/compositores/" + req.body._id);
      }).catch((erro) => {
        res.render("error", { error: erro, message: "Erro ao criar o compositor" })
      })
})

/* POST Apagar Compositor */
router.post('/compositores/eliminar/:id', function (req, res, next) {
    Compositor.removeById(req.params.id)
    .then(resp => {
        res.status(200).redirect('/compositores');
    }).catch(erro => {
        res.status(505).render('error', { error: erro })
    })
})

router.get("/periodos", function (req, res, next) {
    Compositor.list()
      .then((compResp) => {
        const periodos = getPeriodos(compResp);
        res.render("periodosListPage", { title: "Lista de períodos", periodos: periodos })
      }).catch((erro) => {
        res.render("error", { error: erro, message: "Erro ao obter periodos" })
      })
  })
  
  router.get("/periodos/:periodo", function (req, res, next) {
    const periodo = req.params.periodo;
    Compositor.findByPeriodo(periodo)
      .then((compResp) => {
        const compositores = getCompositoresByPeriodo(compResp, periodo)
        res.render("periodoPage", { title: "Período " + periodo, periodo: periodo , compositores: compositores})
      })
      .catch((erro) => { 
        res.render("error", { error: erro, message: "Erro ao obter compositores" })
      })
  })
  

module.exports = router;