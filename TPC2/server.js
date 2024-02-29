var http = require('http')
var url = require('url')
var axios = require('axios')

http.createServer((req, res) => {
    console.log(req.method + " " + req.url)

    var q = url.parse(req.url, true)

    res.writeHead(200, { 'Content-Type': 'text/html; charset= utf-8' })
    res.write("<body style='font-family: Arial, Helvetica, sans-serif; background-color:beige;'>")
    res.write("<nav style='background: rgb(72, 35, 128); height: 80px;'>")
    res.write("<div style ='position: relative; height: 80px; display: flex; align-items: center; justify-content: center;'>")
    res.write("<h1><a style='color: white; text-decoration: none; font-weight: bold; font-size: 32px;' href='/'>Escola de Música</a></h1></div>")
    res.write("</div></nav>")
    
    // Página Inicial
    if (q.pathname == "/") {
        res.write("<div style='text-align: center; align-items: center; margin: 50px 20px; display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: minmax(100px, auto); gap: 20px; height: 75%; justify-content: stretch;'>")
        res.write("<a style='text-decoration: none; height: 100%; width: 100%;' href='/alunos'> <div style='border: solid; border-width: 4px; border-color: rgb(72, 35, 128); border-radius: 16px; overflow: hidden; height: 100%; color: rgb(72, 35, 128); background-color:beige; display: flex; align-items: center; justify-content: center; padding: 0 40px; font-weight: bold; font-size: 24px; cursor: pointer;' onmouseover=\"this.style.transform = 'scale(1.05)'\" onmouseout=\"this.style.transform = 'scale(1.0)'\"><h2>Alunos</h2></div></a>")
        res.write("<a style='text-decoration: none; height: 100%; width: 100%;' href='/cursos'> <div style='border: solid; border-width: 4px; border-color: rgb(72, 35, 128); border-radius: 16px; overflow: hidden; height: 100%; color: rgb(72, 35, 128); background-color:beige; display: flex; align-items: center; justify-content: center; padding: 0 40px; font-weight: bold; font-size: 24px; cursor: pointer;' onmouseover=\"this.style.transform = 'scale(1.05)'\" onmouseout=\"this.style.transform = 'scale(1.0)'\"><h2>Cursos</h2></div></a>")
        res.write("<a style='text-decoration: none; height: 100%; width: 100%;' href='/instrumentos'> <div style='border: solid; border-width: 4px; border-color: rgb(72, 35, 128); border-radius: 16px; overflow: hidden; height: 100%; color: rgb(72, 35, 128); background-color:beige; display: flex; align-items: center; justify-content: center; padding: 0 40px; font-weight: bold; font-size: 24px; cursor: pointer;' onmouseover=\"this.style.transform = 'scale(1.05)'\" onmouseout=\"this.style.transform = 'scale(1.0)'\"><h2>Instrumentos</h2></div></a>")
        res.write("</div>")
        res.write("</body>")
        res.end();
    } 

    // Página com a lista de todos os alunos ordenados alfabeticamente
    else if (q.pathname == "/alunos") {
        axios.get("http://localhost:3000/alunos?_sort=nome").then((resp) => {
            var data = resp.data;
            res.write("<div style='margin: 40px 250px 0 250px;display: grid;'>")
            res.write("<div style='text-align: center;'><h1 style='font-weight: bold; text-decoration: dashed overline;'>Lista de Alunos</h1></div>")
            res.write("<ol>")
            for (i in data) {
                res.write("<li style='font-size: 32px; font-weight: bold; color:rgb(72, 35, 128);'> <a href='/alunos/" + data[i].id + "' style='text-decoration:none;'> <div style='margin: 15px 0; border: solid;border-width: 2px;border-color: rgb(72, 35, 128);border-radius: 16px;overflow: hidden;height: 72px;cursor: pointer; color: rgb(72, 35, 128);background-color:beige;display: flex;align-items: center;justify-content: left;padding: 0 40px;font-weight: bold;font-size: 24px;'>" + data[i].nome + " [" + data[i].id + "] " + "</div></a></li>")
            }
            res.write("</ol>")
            res.write("<div style='display:flex;justify-content: center; margin: 10px 0;'><a href='/' style='display: inline-block;padding: 20px 0;width: 50%; font-weight:bold; border: 2px solid rgb(72, 35, 128);border-radius: 8px;background-color: rgb(72, 35, 128);color: beige;text-align: center; cursor: pointer;'> Voltar à pagina principal </a></div>")
            res.write("</div></body>") 
            res.end()
        }).catch((erro) => {
            console.log("Erro: " + erro)
            res.write("<p>" + erro + "</p>")
        })
    }

    // Página de um aluno individual
    else if (q.pathname.match(/\/alunos\/A\d+/)) {
        let id = req.url.substring(8)
        axios.get("http://localhost:3000/alunos/" + id).then((resp) => {
            aluno = resp.data;
            res.write("<div style='margin: 40px 250px 0 250px;display: grid;'>")
            res.write("<div style='text-align: center; font-weight: bold;'><h1>"+ aluno.nome +"</h1></div>")
            res.write("<div style='border: solid;border-width: 2px;border-color: rgb(72, 35, 128);border-radius: 16px;overflow: hidden;padding: 25px 40px; margin: 20px 0;'>")
            res.write("<p><b>Nome:</b> " + aluno.nome + "</p>")
            res.write("<p><b>ID:</b> " + aluno.id + "</p>")
            res.write("<p><b>Data de Nascimento:</b> " + aluno.dataNasc + "</p>")
            res.write("<b>Curso:</b><a href='/cursos/" + aluno.curso + "'> " + aluno.curso + "</a>") 
            res.write("<p><b>Ano:</b> " + aluno.anoCurso + "</p>")
            res.write("<p><b>Instrumento:</b><a href='/instrumentos/" + aluno.instrumento + "'> " + aluno.instrumento + "</a></p>")
            res.write("</div>")
            res.write("<div style='display:flex;justify-content: center; margin: 10px 0;'><a href='/alunos' style='display: inline-block;padding: 20px 0;width: 50%; font-weight:bold; border: 2px solid rgb(72, 35, 128);border-radius: 8px;background-color: rgb(72, 35, 128);color: beige;text-align: center; cursor: pointer;'> Voltar à página de alunos </a></div>")
            res.write("</div></body>")
            res.end()

        }).catch((erro) => {
            console.log("Erro: " + erro)
            res.write("<p>" + erro + "</p>")
        })
    }

    // Página com a lista de todos os cursos ordenados alfabeticamente
    else if (req.url == "/cursos") {
        axios.get("http://localhost:3000/cursos?_sort=designacao").then((resp) => {
            var data = resp.data;
            res.write("<div style='margin: 40px 250px 0 250px;display: grid;'>")
            res.write("<div style='text-align: center;'><h1 style='font-weight: bold; text-decoration: dashed overline;'>Lista de Cursos</h1></div>")
            res.write("<ol>")
            for (i in data) {
                res.write("<li style='font-size: 32px; font-weight: bold; color:rgb(72, 35, 128);'> <a href='/cursos/" + data[i].id + "' style='text-decoration:none;'> <div style='margin: 15px 0; border: solid;border-width: 2px;border-color: rgb(72, 35, 128);border-radius: 16px;overflow: hidden;height: 72px;cursor: pointer; color: rgb(72, 35, 128);background-color:beige;display: flex;align-items: center;justify-content: left;padding: 0 40px;font-weight: bold;font-size: 24px;'>" + data[i].designacao + " [" + data[i].id + "] " + "</div></a></li>")
            }
            res.write("</ol>")
            res.write("<div style='display:flex;justify-content: center; margin: 10px 0;'><a href='/' style='display: inline-block;padding: 20px 0;width: 50%; font-weight:bold; border: 2px solid rgb(72, 35, 128);border-radius: 8px;background-color: rgb(72, 35, 128);color: beige;text-align: center; cursor: pointer;'> Voltar à pagina principal </a></div>")
            res.write("</div></body>") 
            res.end()
        }).catch((erro) => {
            console.log("Erro: " + erro)
            res.write("<p>" + erro + "</p>")
        })
    }

    // Página de um curso individual
    else if (q.pathname.match(/\/cursos\/C(B|S)\d+/)) {
        let id = req.url.substring(8)
        axios.get("http://localhost:3000/cursos/" + id).then((resp) => {
            curso = resp.data
            res.write("<div style='margin: 40px 250px 0 250px;display: grid;'>")
            res.write("<div style='text-align: center; font-weight: bold;'><h1>"+ curso.designacao +"</h1></div>")
            res.write("<div style='border: solid;border-width: 2px;border-color: rgb(72, 35, 128);border-radius: 16px;overflow: hidden;padding: 25px 40px; margin: 20px 0;'>")
            res.write("<p><b>Designação:</b> " + curso.designacao + "</p>")
            res.write("<p><b>ID:</b> " + curso.id + "</p>")
            res.write("<p><b>Duração:</b> " + curso.duracao + "</p>")
            res.write("<b>Instrumento:</b> <a href='/instrumentos/" + curso.instrumento.text + "'>" + curso.instrumento.text + "</a>")
            res.write("</div>")
            res.write("<div style='display:flex;justify-content: center; margin: 10px 0;'><a href='/cursos' style='display: inline-block;padding: 20px 0;width: 50%; font-weight:bold; border: 2px solid rgb(72, 35, 128);border-radius: 8px;background-color: rgb(72, 35, 128);color: beige;text-align: center; cursor: pointer;'> Voltar à página de cursos </a></div>")
            res.write("</div></body>")
            res.end()

        }).catch((erro) => {
            console.log("Erro: " + erro)
            res.write("<p>" + erro + "</p>")
        })
    }

    // Página com a lista de todos os instrumentos ordenados alfabeticamente
    else if (req.url == "/instrumentos") {
        axios.get("http://localhost:3000/instrumentos?_sort=text").then((resp) => {
            var data = resp.data;
            res.write("<div style='margin: 40px 250px 0 250px;display: grid;'>")
            res.write("<div style='text-align: center;'><h1 style='font-weight: bold; text-decoration: dashed overline;'>Lista de Instrumentos</h1></div>")
            res.write("<ol>")
            data.forEach(i => {
                res.write("<li style='font-size: 32px; font-weight: bold; color:rgb(72, 35, 128);'> <a href='/instrumentos/" + i["id"] + "' style='text-decoration:none;'> <div style='margin: 15px 0; border: solid;border-width: 2px;border-color: rgb(72, 35, 128);border-radius: 16px;overflow: hidden;height: 72px;cursor: pointer; color: rgb(72, 35, 128);background-color:beige;display: flex;align-items: center;justify-content: left;padding: 0 40px;font-weight: bold;font-size: 24px;'>" + i["text"] + "</div></a></li>")
            })
            res.write("</ol>")
            res.write("<div style='display:flex;justify-content: center; margin: 10px 0;'><a href='/' style='display: inline-block;padding: 20px 0;width: 50%; font-weight:bold; border: 2px solid rgb(72, 35, 128);border-radius: 8px;background-color: rgb(72, 35, 128);color: beige;text-align: center; cursor: pointer;'> Voltar à pagina principal </a></div>")
            res.write("</div></body>") 
            res.end()
        }).catch((erro) => {
            console.log("Erro: " + erro)
            res.write("<p>" + erro + "</p>")
        })
    }

    // Página de um instrumento individual
    else if (q.pathname.match(/\/instrumentos\/(I\d+|\w+)/)) {
        let id = req.url.substring(14)
        let url = ""

        let isId = true
        if(id.match(/I\d+/)) url = "http://localhost:3000/instrumentos/" + id // Caso seja o id
        else if (id.match(/\w+/)) {
            url = "http://localhost:3000/instrumentos?text="+id // Caso seja o nome do instrumento
            isId = false
        } 
        
        axios.get(url).then((resp) => {
            if(!isId) instrumento = resp.data[0]
            else instrumento = resp.data
            res.write("<div style='margin: 40px 250px 0 250px;display: grid;'>")
            res.write("<div style='text-align: center; font-weight: bold;'><h1>"+ instrumento.text +"</h1></div>")
            res.write("<div style='border: solid;border-width: 2px;border-color: rgb(72, 35, 128);border-radius: 16px;overflow: hidden;padding: 25px 40px; margin: 20px 0;'>")
            res.write("<p><b>Instrumento:</b> " + instrumento.text + "</p>")
            res.write("<p><b>ID:</b> " + instrumento.id + "</p>")
            res.write("</div>")
            res.write("<div style='display:flex;justify-content: center; margin: 10px 0;'><a href='/instrumentos' style='display: inline-block;padding: 20px 0;width: 50%; font-weight:bold; border: 2px solid rgb(72, 35, 128);border-radius: 8px;background-color: rgb(72, 35, 128);color: beige;text-align: center; cursor: pointer;'> Voltar à página de cursos </a></div>")
            res.write("</div></body>")
            res.end()
        }).catch((erro) => {
            console.log("Erro: " + erro)
            res.write("<p>" + erro + "</p>")
        })
    }

    // Página para operação inválida
    else { 
        res.write("<div style='text-align: center; margin-top: 256px;'><h1> Operação não suportada </h1></div>")
        res.write("</body>")
        res.end();
    }

}).listen(2002) // Dia de realização

console.log("Servidor à escuta na porta 2002")