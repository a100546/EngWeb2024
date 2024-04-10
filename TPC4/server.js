var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')
var static = require('./static.js')

function collectRequestBodyData(request, callback) {
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var compositoresServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if (static.staticResource(req)) {
        static.serverStaticResource(req, res)
    }
    else {
        switch (req.method) {
            case 'GET':
                // Página Inicial
                if (req.url == "/") {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(templates.indexPage())
                    res.end()
                } 
                //Lista dos compositores
                else if (req.url == "/compositores") {
                    axios.get('http://localhost:3000/compositores?_sort=nome')
                    .then(resp => {
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(templates.compositoresListPage(resp.data))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(501, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<p>Não foi possível obter a lista de compositores: " + erro + "</p>")
                        res.end()
                    })
                } 
                //Pagina de um compositor
                else if (/\/compositores\/C\d+$/.test(req.url)) {
                    id = req.url.split('/')[2]
                    axios.get('http://localhost:3000/compositores/' + id)
                    .then(resp => {
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(templates.compositorPage(resp.data))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<p>Não foi possível obter informação do compositor " + id +": " + erro + "</p>")
                        res.end()
                    })
                } 
                //Página de editar um compositor
                else if (/\/compositores\/editar\/C\d+$/.test(req.url)) {
                    id = req.url.split('/')[3]
                    axios.get('http://localhost:3000/compositores/' + id)
                    .then(resp => {
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(templates.compositorEditPage(resp.data))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<p>Não foi possível obter informação do compositor " + id +": " + erro + "</p>")
                        res.end()
                    })
                } 
                // Apagar um compositor
                else if (/\/compositores\/eliminar\/C\d+$/.test(req.url)) {
                    id = req.url.split('/')[3]
                    axios.delete('http://localhost:3000/compositores/' + id)
                    .then(resp => {
                        res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Registo "+id+" apagado com sucesso</p>")
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(503, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<p>Não foi possível apagar o compositor "+ id +": " + erro + "</p>")
                        res.end()
                    })
                } 
                // Página de adicionar um compositor
                else if (req.url == "/compositores/adicionar") {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(templates.compositorAddPage())
                    res.end()
                } 
                // Lista dos períodos
                else if (req.url == "/periodos") {
                    axios.get('http://localhost:3000/periodos?_sort=nome')
                    .then(resp => {
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(templates.periodosListPage(resp.data))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(504, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<p>Não foi possível obter a lista de períodos: " + erro + "</p>")
                        res.end()
                    })
                } 
                // Adicionar um período
                else if (req.url == "/periodos/adicionar") {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(templates.periodoAddPage())
                    res.end()
                }
                // Página de um período
                else if (/\/periodos\/\w+$/.test(req.url)) {
                    id = req.url.split('/')[2]
                    axios.get('http://localhost:3000/compositores?_sort=nome')
                        .then(resp => {
                            compositores = resp.data.filter(compositor => compositor.periodo == id)
                            res.writeHead(201, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write(templates.periodoPage(id,compositores))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(505, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write("<p>Não foi possível obter o periodo "+ id +": " + erro + "</p>")
                            res.end()
                        })
                }
                // Caso de get erro
                else {
                    res.writeHead(506, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write("<p>Erro: " + req.url + " GET request não suportado.</p>")
                    res.end()
                }
                break

            case 'POST':
                // Post do editar compositor
                if (/\/compositores\/editar\/C\d+$/.test(req.url)) {
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.put('http://localhost:3000/compositores/' + result.id, result)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write("<p>Compositor alterado com sucesso: "+ JSON.stringify(resp.data)+"</p>")
                                    res.end()
                                })
                                .catch(erro => {
                                    res.writeHead(508, { 'Content-Type': 'text/html; charset=utf-8' })
                                    res.write("<p>Não foi possível editar o compositor "+ result.id +": " + erro + "</p>")
                                    res.end()
                                })
                        } else {
                            res.writeHead(507, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter os dados do body</p>")
                            res.end()
                        }
                    })
                }
                //Post de adicionar compositor
                else if (req.url == "/compositores/adicionar") {
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.post('http://localhost:3000/compositores', result)
                                .then(resp => {
                                    res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write("<p>Compositor inserido com sucesso: "+ JSON.stringify(resp.data)+"</p>")
                                    res.end()
                                })
                                .catch(erro => {
                                    res.writeHead(510, { 'Content-Type': 'text/html; charset=utf-8' })
                                    res.write("<p>Não foi possível adicionar o compositor: " + erro + "</p>")
                                    res.end()
                                })
                        } else {
                            res.writeHead(509, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível processar os dados do body</p>")
                            res.end()
                        }
                    })
                }
                //Post de adicionar periodo
                else if (req.url == "/periodos/adicionar") {
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.post('http://localhost:3000/periodos', result)
                                .then(resp => {
                                    res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write("<p>Periodo inserido com sucesso: "+ JSON.stringify(resp.data)+"</p>")
                                    res.end()
                                })
                                .catch(erro => {
                                    res.writeHead(512, { 'Content-Type': 'text/html; charset=utf-8' })
                                    res.write("<p>Não foi possível adicionar o período: " + erro + "</p>")
                                    res.end()
                                })
                        } else {
                            res.writeHead(511, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível processar os dados do body</p>")
                            res.end()
                        }
                    })
                }
                //Caso de post erro
                else {
                    res.writeHead(512, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write("<h1>Erro: " + req.url + " POST request não suportado.</h1>")
                    res.end()
                }
                break

            default:
                // Outros metodos nao sao suportados
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write("<p>Não foi possível efetuar a operação</p>")
                res.end()
                break
        }
    }
})

compositoresServer.listen(5030, () => {
    console.log("Servidor à escuta na porta 5030...")
})