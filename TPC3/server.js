var http = require('http');
var url = require('url');
var axios = require('axios');
var fs = require('fs');

// Página com todos os filmes
function indexFilmes(data) {
    html = `
    <html>
        <head>
            <title>Lista de Filmes</title>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="w3.css">
        </head>
        <body>
            <div class="w3-container w3-indigo w3-center">
                <a href="/" style="text-decoration:none">
                    <h1>Lista de Filmes</h1>
                </a>
            </div>

            <div class="w3-container w3-margin-top w3-margin-bottom">
                <input type="text" id="searchInput" onkeyup="filterTable()" class="w3-input w3-border" placeholder="Pesquisar filmes...">
            </div>

            <table id="movieTable" class="w3-table w3-bordered">
                <tr>
                    <th style="width: 10%;">Ano</th>
                    <th style="width: 90%;">Título</th>
                </tr>
    `
    data.forEach(movie => {
        html += `
        <tr>
            <td>${movie.year}</td>
            <td><a href="/filmes/${movie.id}">${movie.title}</a></td>
        </tr>
        `
    })

    html += `
            </table>
            <div>
                <a class="w3-btn w3-indigo" style="position:fixed; bottom: 25px; right: 25px" href='/'>Voltar à página inicial</a>
            </div>

            <footer class="w3-container w3-light-gray w3-center">
              <h5><i>Gerado por Tomás Sousa</i></h5>
            </footer>

            <script>
                function filterTable() {
                    var input, filter, table, tr, td, i, txtValue;
                    input = document.getElementById("searchInput");
                    filter = input.value.toUpperCase();
                    table = document.getElementById("movieTable");
                    tr = table.getElementsByTagName("tr");

                    for (i = 0; i < tr.length; i++) {
                        td = tr[i].getElementsByTagName("td")[1];
                        if (td) {
                            txtValue = td.textContent || td.innerText;
                            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                tr[i].style.display = "";
                            } else {
                                tr[i].style.display = "none";
                            }
                        }
                    }
                }
            </script>
        </body>
    </html>
    `
    return html
}

// Página de um filme individual
function paginaFilme(data) {
    html = `
    <html>
        <head>
            <title>${data.title}</title>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css">
        </head>
        <body>
            <div class="w3-container w3-indigo w3-center">
                <h1>${data.title}</h1>
            </div>
            <div class="w3-card-4">
                <header class="w3-container w3-light-grey">
                    <h3>${data.title}</h3>
                </header>
                <div class="w3-container">
                    <p><b>Ano:</b> ${data.year}</p>
                    <hr>
    `
    if (data.cast) {
        html += `
            <p><b>Atores/Atrizes:</b></p>
            <ul>   
        `
        for (actor in data.cast.sort()) {
            html += "<li><a href='/atores/" + data.cast[actor] + "'>" + data.cast[actor] + "</a></li>"
        }
    }

    if (data.genres) {
        html += `
                </ul>
                <hr>
            <p><b>Géneros:</b></p>
            <ul>
        `
        for (genre in data.genres.sort()) {
            html += "<li><a href='/generos/" + data.genres[genre] + "'>" + data.genres[genre] + "</a></li>"
        }
    }

    html += `
        </ul>
        </div>
            <div>
                <a class="w3-btn w3-indigo" style="position:fixed; bottom: 25px; right: 25px" href='/filmes'>Voltar à página de filmes</a>
            </div>

            <footer class="w3-container w3-light-gray w3-center">
              <h5><i>Gerado por Tomás Sousa</i></h5>
            </footer>
        </body>
        </html>
    `

    return html
}

// Página com todos os atores/atrizes
function indexAtores(data) {
    let html = `
    <html>
        <head>
            <title>Lista de Atores/Atrizes</title>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="w3.css">
        </head>
        <body>
            <div class="w3-container w3-indigo w3-center">
                <a href="/" style="text-decoration:none">
                    <h1>Lista de Atores</h1>
                </a>
            </div>

            <div class="w3-container w3-margin-top w3-margin-bottom">
                <input type="text" id="searchInput" onkeyup="filterTable()" class="w3-input w3-border" placeholder="Pesquisar atores/atrizes...">
            </div>

            <table class="w3-table w3-bordered">
                <tr>
                    <th>Nome</th>
                </tr>
    `;

    data.forEach(actor => {
        html += `
        <tr>
            <td><a href="/atores/${actor.id}">${actor.id}</a></td>
        </tr>
        `;
    });

    html += `
            </table>
            <div>
                <a class="w3-btn w3-indigo" style="position:fixed; bottom: 25px; right: 25px" href='/'>Voltar à página inicial</a>
            </div>

            <footer class="w3-container w3-light-gray w3-center">
                <h5><i>Gerado por Tomás Sousa</i></h5>
            </footer>

            <script>
                function filterTable() {
                    var input, filter, table, tr, td, i, txtValue;
                    input = document.getElementById("searchInput");
                    filter = input.value.toUpperCase();
                    table = document.getElementsByTagName("table")[0];
                    tr = table.getElementsByTagName("tr");

                    for (i = 1; i < tr.length; i++) { // Start from 1 to skip header row
                        td = tr[i].getElementsByTagName("td")[0];
                        if (td) {
                            txtValue = td.textContent || td.innerText;
                            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                tr[i].style.display = "";
                            } else {
                                tr[i].style.display = "none";
                            }
                        }
                    }
                }
            </script>
        </body>
    </html>
    `;

    return html;
}

// Página de um ator/atriz individual
function paginaAtor(ator,data) {
    var nome = ator.replace(/%20/g, " ");
    var filmes = data.movies.sort();
    html = `
    <html>
        <head>
            <title>${nome}</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="/w3.css">
        </head>
        <body>
            <div class="w3-container w3-indigo w3-center">
                <h1>${nome}</h1>
            </div>
            <div class="w3-card-4">
                <header class="w3-container w3-light-grey">
                    <h3>${nome}</h3>
                </header>
                <div class="w3-container">
                    <h3>Filmes:</h3>
                    <ul>
    `

    filmes.forEach(filme => {
        console.log(filme)
        html += `<li>${filme}</li>`
    })

    html += `
    </ul>
    </div>
        <div>
            <a class="w3-btn w3-indigo" style="position:fixed; bottom: 25px; right: 25px" href='/atores'>Voltar à página de Atores</a>
        </div>

        <footer class="w3-container w3-light-gray w3-center">
            <h5><i>Gerado por Tomás Sousa</i></h5>
        </footer>
    </body>
    </html>
    `

    return html
}

// Página com todos os géneros de filmes
function indexGeneros(data) {
    let html = `
    <html>
    <head>
        <title>Lista de Géneros</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
        <div class="w3-container w3-indigo w3-center">
            <a href="/" style="text-decoration:none">
                <h1>Lista de Géneros</h1>
            </a>
        </div>

        <div class="w3-container w3-margin-top w3-margin-bottom">
            <input type="text" id="searchInput" onkeyup="filterTable()" class="w3-input w3-border" placeholder="Pesquisar géneros...">
        </div>

        <table class="w3-table w3-bordered">
            <tr>
                <th>Género</th>
            </tr>
    `;

    data.forEach(genre => {
        html += `
        <tr>
            <td><a href='/generos/${genre.id}'>${genre.id}</a></td>
        </tr>
        `;
    });

    html += `
        </table>
        <div>
            <a class="w3-btn w3-indigo" style="position:fixed; bottom: 25px; right: 25px" href='/'>Voltar à página inicial</a>
        </div>

        <footer class="w3-container w3-light-gray w3-center">
            <h5><i>Gerado por Tomás Sousa</i></h5>
        </footer>

        <script>
            function filterTable() {
                var input, filter, table, tr, td, i, txtValue;
                input = document.getElementById("searchInput");
                filter = input.value.toUpperCase();
                table = document.getElementsByTagName("table")[0];
                tr = table.getElementsByTagName("tr");

                for (i = 1; i < tr.length; i++) { // Start from 1 to skip header row
                    td = tr[i].getElementsByTagName("td")[0];
                    if (td) {
                        txtValue = td.textContent || td.innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            tr[i].style.display = "";
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                }
            }
        </script>
    </body>
    </html>
    `;

    return html;
}

// Página de um género individual
function paginaGenero(genero,data) {
    var nome = genero.replace(/%20/g, " ");
    var filmes = data.movies.sort();
    html = `
    <html>
        <head>
            <title>${nome}</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="/w3.css">
        </head>
        <body>
            <div class="w3-container w3-indigo w3-center">
                <h1>${nome}</h1>
            </div>
            <div class="w3-card-4">
                <header class="w3-container w3-light-grey">
                    <h3>${nome}</h3>
                </header>
                <div class="w3-container">
                    <h3>Filmes: </h3>
                    <ul>
    `

    filmes.forEach(filme => {
        console.log(filme)
        html += `<li>${filme}</li>`
    })

    html += `
    </ul>
    </div>
        <div>
            <a class="w3-btn w3-indigo" style="position:fixed; bottom: 25px; right: 25px" href='/generos'>Voltar à página de Géneros</a>
        </div>

        <footer class="w3-container w3-light-gray w3-center">
            <h5><i>Gerado por Tomás Sousa</i></h5>
        </footer>
    </body>
    </html>
    `

    return html
}

http.createServer((req, res) => {
    console.log(req.method + " " + req.url);

    var q = url.parse(req.url, true);

    //Página inicial
    if (req.url == '/') {
        fs.readFile("web.html", (erro, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset= utf-8' });
            res.write(data)
            res.end()
        })
    }
    //Lista dos filmes
    else if (req.url == "/filmes") {
        axios.get("http://localhost:3000/movies?_sort=title").then(resp => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(indexFilmes(resp.data));
            res.end();
        }).catch(erro => {
            res.writeHead(500, { 'Content-Type': 'text/html; charset= utf-8' })
            res.write("<p> Não foi possivel processar os filmes: " + erro + "</p>")
            res.end()
        })

    }
    // Página de um filme individual
    else if (q.pathname.match(/\/filmes\/\w+/)) {
        var filme = q.pathname.substring(8)
        axios.get("http://localhost:3000/movies/" + filme).then(resp => {
            res.write(paginaFilme(resp.data))
            res.end()
        }).catch(erro => {
            res.writeHead(501, { 'Content-Type': 'text/html; charset= utf-8' })
            res.write("<p> Não foi possivel processar o filme: " + erro + "</p>")
            res.end()
        })

    }
    //Lista dos atores
    else if (req.url == "/atores") {
        axios.get("http://localhost:3000/actors?_sort=id").then(resp => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(indexAtores(resp.data))
            res.end()
        }).catch(erro => {
            res.writeHead(502, { 'Content-Type': 'text/html; charset= utf-8' })
            res.write("<p> Não foi possivel processar os atores: " + erro + "</p>")
            res.end()
        })
    }
    // Página de um ator/atriz individual
    else if (q.pathname.match(/\/atores\/\w+([\W]+)?/)) {
        var ator = q.pathname.substring(8)
        axios.get("http://localhost:3000/actors/"+ator).then(resp => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(paginaAtor(ator,resp.data))
            res.end()
        }).catch(erro => {
            res.writeHead(503, { 'Content-Type': 'text/html; charset= utf-8' })
            res.write("<p> Não foi possivel processar o ator: " + erro + "</p>")
            res.end()
        })
    }
    //Lista dos géneros de filmes
    else if (req.url == "/generos") {
        axios.get("http://localhost:3000/genres?_sort=id").then(resp => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(indexGeneros(resp.data))
            res.end()
        }).catch(erro => {
            res.writeHead(504, { 'Content-Type': 'text/html; charset= utf-8' })
            res.write("<p> Não foi possivel processar os géneros: " + erro + "</p>")
            res.end()
        })

    }
    // Página de um género individual
    else if (q.pathname.match(/\/generos\/\w+([\W]+)?/)) {
        var genero = q.pathname.substring(9)
        axios.get("http://localhost:3000/genres/"+genero).then(resp => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(paginaGenero(genero,resp.data))
            res.end()
        }).catch(erro => {
            res.writeHead(505, { 'Content-Type': 'text/html; charset= utf-8' })
            res.write("<p> Não foi possivel processar o género: " + erro + "</p>")
            res.end()
        })
    }
    // w3 CSS
    else if (req.url == "/w3.css") {
        fs.readFile("w3.css", (erro, data) => {
            res.writeHead(200, { "Content-Type": "text/css; charset=utf-8" })
            res.write(data)
            res.end()
        })
    }
    // Erro
    else {
        res.writeHead(400, { 'Content-Type': 'text/html; charset= utf-8' });
        res.write("<p>Erro: Pedido não suportado</p>");
        res.write("<pre>" + req.url + "</pre>");
        res.end();
    }

}).listen(2702)

console.log("Servidor à escuta na porta 2702")