exports.indexPage = function () { 
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>Compositores</title>
    </head>
    <body class="w3-pale-yellow">
        <div class="w3-card-4">
            <header class="w3-container w3-brown w3-center">
                <h1>Compositores de Música</h1>
            </header>
            <div class="w3-container w3-center">
                <a href="/compositores" style="text-decoration: none;font-size: 35px;font-weight: bold">
                    <div class="w3-panel w3-round-xlarge w3-khaki w3-center" style="margin: 70px;padding: 70px 0">
                        Compositores
                    </div>
                </a>
                <a href="/periodos" style="text-decoration: none;font-size: 34px;font-weight: bold">
                    <div class="w3-panel w3-round-xlarge w3-khaki w3-center" style="margin: 70px;padding: 70px 0">
                        Períodos
                    </div>
                </a>
            </div>
            <footer class="w3-container w3-dark-gray w3-center">
                <h5><i>Gerado por Tomás Sousa</i></h5>
            </footer>
        </div>
    </body>
    </html>
    `
}

exports.compositoresListPage = function (compositores) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>Compositores</title>
    </head>
    <body class="w3-pale-yellow">
        <div class="w3-card-4">
            <header class="w3-display-container w3-brown w3-center" style="width: 100%;height: 74px">
                <h1 class="w3-margin-left w3-display-topleft">Compositores</h1>
                <a href="/compositores/adicionar" class="w3-dark-gray w3-margin-right w3-padding w3-display-right" style="text-decoration: none;font-size: 28px;font-weight: bold">+</a>
            </header>
            <div class="w3-container w3-margin-top w3-margin-bottom">
                <table class="w3-table-all w3-hoverable">
                    <tr class="w3-brown">
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Edição</th>
                        <th>Remoção</th>
                    </tr>
                
    `
    for (i = 0; i < compositores.length; i++) {
        pagHTML += `
        <tr>
            <td>${compositores[i].id}</td>
            <td><a href="/compositores/${compositores[i].id}">${compositores[i].nome}</a></td>
            <td>[<a href="/compositores/editar/${compositores[i].id}">Editar</a>]</td>
            <td>[<a href="/compositores/eliminar/${compositores[i].id}">Eliminar</a>]</td>
        </tr>
        `
    }

    pagHTML += `
                </table>
            </div>
            <div>
                <a class="w3-btn w3-brown" style="position:fixed; bottom: 25px; right: 25px" href='/'>Voltar à página inicial</a>
            </div>
            <footer class="w3-container w3-dark-gray w3-center">
                <h5><i>Gerado por Tomás Sousa</i></h5>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

exports.compositorPage = function (compositor) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>${compositor.nome}</title>
    </head>
    <body class="w3-pale-yellow">
        <div class="w3-card-4">
            <header class="w3-container w3-brown w3-center">
                <h1>${compositor.nome}</h1>
            </header>
            <div class="w3-container">
                <p class="w3-panel w3-leftbar"><b>ID:</b> ${compositor.id}</p>
                <hr>
                <p class="w3-panel w3-leftbar"><b>Biografia:</b> ${compositor.bio}</p>
                <hr>
                <p class="w3-panel w3-leftbar"><b>Data de nascimento:</b> ${compositor.dataNasc}</p>
                <hr>
                <p class="w3-panel w3-leftbar"><b>Data de óbito:</b> ${compositor.dataObito}</p>
                <hr>
                <p class="w3-panel w3-leftbar"><b>Período:</b> <a href="/periodos/${compositor.periodo}">${compositor.periodo}</a></p>
            </div>
            <div>
                <a class="w3-btn w3-brown" style="position:fixed; bottom: 25px; right: 25px" href='/compositores'>Voltar à lista de Compositores</a>
            </div>
            <footer class="w3-container w3-dark-gray w3-center">
                <h5><i>Gerado por Tomás Sousa</i></h5>
            </footer>
        </div>
    </body>
    </html>
    `
}

exports.compositorEditPage = function (compositor) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>Editar Compositor</title>
    </head>
    <body class="w3-pale-yellow">
        <div class="w3-card-4">
            <header class="w3-container w3-brown w3-center">
                <h1>${compositor.nome}</h1>
            </header>
            <div class="w3-container">
                <form class="w3-container" method="POST">
                    <fieldset class="w3-margin-top w3-margin-bottom">
                        <legend>Dados do Compositor</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${compositor.id}"/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${compositor.nome}"/>
                        <label>Período</label>
                        <input class="w3-input w3-round" type="text" name="periodo" value="${compositor.periodo}"/>
                        <label>Biografia</label>
                        <input class="w3-input w3-round" type="text" name="bio" value="${compositor.bio}"/>
                        <label>Data de nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc" value="${compositor.dataNasc}"/>
                        <label>Data de óbito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito" value="${compositor.dataObito}"/>
                    <fieldset/>
                    <button class="w3-btn w3-brown w3-mb-2 w3-margin-top" type="submit">Guardar Alterações</button>
                </form>
            </div>
            <div>
                <a class="w3-btn w3-brown" style="position:fixed; bottom: 25px; right: 25px" href='/compositores'>Voltar à página anterior</a>
            </div>
            <footer class="w3-container w3-dark-gray w3-center">
                <h5><i>Gerado por Tomás Sousa</i></h5>
            </footer>
        </div>
    </body>
    </html>
    `
}

exports.compositorAddPage = function () {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>Novo Compositor</title>
    </head>
    <body class="w3-pale-yellow">
        <div class="w3-card-4">
            <header class="w3-container w3-brown w3-center">
                <h1>Novo Compositor</h1>
            </header>
            <div class="w3-container">
                <form class="w3-container" method="POST">
                    <fieldset class="w3-margin-top w3-margin-bottom">
                        <legend>Dados do Compositor</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id"/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome"/>
                        <label>Período</label>
                        <input class="w3-input w3-round" type="text" name="periodo"/>
                        <label>Biografia</label>
                        <input class="w3-input w3-round" type="text" name="bio"/>
                        <label>Data de nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc"/>
                        <label>Data de óbito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito"/>
                    <fieldset/>
                    <br>
                    <button class="w3-btn w3-brown w3-mb-2 w3-margin-top" type="submit">Registar Compositor</button>
                </form>
            </div>
            <div>
                <a class="w3-btn w3-brown" style="position:fixed; bottom: 25px; right: 25px" href='/compositores'>Voltar à página anterior</a>
            </div>
            <footer class="w3-container w3-dark-gray w3-center">
                <h5><i>Gerado por Tomás Sousa</i></h5>
            </footer>
        </div>
    </body>
    </html>
    `
}

exports.periodosListPage = function (periodos) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>Períodos</title>
    </head>
    <body class="w3-pale-yellow">
        <div class="w3-card-4">
            <header class="w3-display-container w3-brown w3-center" style="width: 100%;height: 74px">
                <h1 class="w3-margin-left w3-display-topleft">Períodos</h1>
                <a href="/periodos/adicionar" class="w3-dark-gray w3-margin-right w3-padding w3-display-right" style="text-decoration: none;font-size: 28px;font-weight: bold">+</a>
            </header>
            <div class="w3-container w3-margin-top w3-margin-bottom">
                <table class="w3-table-all w3-hoverable">
                    <tr class="w3-brown">
                        <th>Nome</th>
                    </tr>
    `

    for (let i = 0; i < periodos.length; i++) {
        pagHTML += `
        <tr>
            <td><a href="/periodos/${periodos[i].id}">${periodos[i].id}</a></td>
        </tr>
        `
    }

    pagHTML += `
            </table>
        </div>
        <div>
            <a class="w3-btn w3-brown" style="position:fixed; bottom: 25px; right: 25px" href='/'>Voltar à página inicial</a>
        </div>
        <footer class="w3-container w3-dark-gray w3-center">
            <h5><i>Gerado por Tomás Sousa</i></h5>
        </footer>
    </div>
    </body>
    </html>
    `
    return pagHTML
}

exports.periodoPage = function (periodo,compositores) {
    pagHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>Período ${periodo}</title>
    </head>
    <body class="w3-pale-yellow">
        <div class="w3-card-4">
            <header class="w3-container w3-brown w3-center">
                <h1>Período ${periodo}</h1>
            </header>
            <div class="w3-container">
            <p class="w3-panel w3-leftbar"><b>Compositores:</b></p>
                <ul>
    `
    for (let i = 0; i < compositores.length; i++) {
        pagHTML += `
                    <li><a href="/compositores/${compositores[i].id}">${compositores[i].nome}</a></li>
        `
    }

    pagHTML += `
                </ul>
            </div>
            <div>
                <a class="w3-btn w3-brown" style="position:fixed; bottom: 25px; right: 25px" href='/periodos'>Voltar à lista de Períodos</a>
            </div>
            <footer class="w3-container w3-dark-gray w3-center">
                <h5><i>Gerado por Tomás Sousa</i></h5>
            </footer>
        </div>
        </body>
        </html>
        `
    return pagHTML


}

exports.periodoAddPage = function (d) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>Novo Período</title>
    </head>
    <body class="w3-pale-yellow">
        <div class="w3-card-4">
            <header class="w3-container w3-brown w3-center">
                <h1>Novo Período</h1>
            </header>
            <div class="w3-container">
                <form class="w3-container" method="POST">
                    <fieldset class="w3-margin-top w3-margin-bottom">
                        <legend>Dados do Período</legend>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="id"/>
                    <fieldset/>
                    <br>
                    <button class="w3-btn w3-brown w3-mb-2" type="submit">Registar Período</button>
                </form>
            </div>
            <div>
                <a class="w3-btn w3-brown" style="position:fixed; bottom: 25px; right: 25px" href='/periodos'>Voltar à página anterior</a>
            </div>
            <footer class="w3-container w3-dark-gray w3-center">
                <h5><i>Gerado por Tomás Sousa</i></h5>
            </footer>
        </div>
    </body>
    </html>
    `
}

exports.errorPage = function (errorMessage, d) {
    return `
    <h1>${d}: Error: ${errorMessage}</h1>
    `
}