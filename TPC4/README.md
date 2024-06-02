# TPC4: Compositores de Música (CRUD)

## 2024-03-05

## Autor
- **Id:** A100546
- **Nome:** Tomás Monteiro Sousa

## Enunciado

**Objetivo:** O objetivo do TPC4 é criar um website, a partir de um dataset JSON, utilizando Node.js e json-server. O dataset será colocado no json-server, que responderá às seguintes rotas:

- GET /compositores: Retorna a lista de todos os compositores.
- GET /compositores/{id}: Retorna as informações de um compositor específico com base no seu ID.
- GET /compositores?periodo={periodo}: Retorna a lista de compositores filtrada pelo período especificado.
- GET /periodos: Retorna a lista de todos os períodos.
- GET /periodos/{id}: Retorna as informações de um período específico com base no seu ID.

Além disso, o serviço implementará operações CRUD (Create, Read, Update, Delete) para os compositores e períodos. Na página principal do website, serão apresentadas ligações para as listas de Compositores e Períodos. A partir dessas listas, será possível escolher um elemento que terá uma página única com as suas características detalhadas.

**Material:** Para este TPC foi fornecido um dataset em JSON com informações sobre compositores. O dataset possui informações sobre o nome, periodo, biografia, data de Nascimento, data de Óbito e o id de cada compositor.

**Tópicos a ter em consideração:**
- A página inicial deve apresentar as opções de escolher entre a visualização de Compositores ou Periodos
- Tendo em conta a opção escolhida, cada página deve apresentar um índice do elemento escolhido ordenado alfabeticamente | Elemento = [Compositores|Periodos]
- Cada elemento da lista deve ter uma hiperligação para uma página individual própria com as suas informações relevantes
    - No caso dos compositores apresenta o id, nome, biografia, data de nascimento, data de óbito e período.
    - No caso dos Períodos apresenta somente o nome e todos os compositores desse período
- As informações da página individual são obtidas através do dataset 
- Cada página individual deverá ter uma hiperligação para voltar à página anterior
- Algumas informações presentes nas páginas individuais podem redirecionar para a página correspondente à característica
- Cada página terá uma estilização básica utilizando o w3.css

## Resultados

- Páginas criadas com sucesso
- Páginas ordenadas alfabeticamente
- Botão de voltar implementado com sucesso
    - Para as listas volta à página inicial
    - Para as páginas individuais volta para a lista do elemento em causa
- Estilização implementada
- Servidor Node.js implementado com sucesso
- Website 100% operacional

De modo a conseguir controlar e melhorar o dataset, utilizando o programa `fix_db.py`, fiz algumas alterações.

Dividi o dataset em `compositores` e `periodos` para acesso mais fácil à informação.

Para os `compositores` manteve-se tudo idêntico.

Para os `periodos` somente adicionei cada periodo como o seu próprio id.

## Como utilizar?

De modo a obter o website a partir do dataset e do servidor Node.js será necessário fazer os seguintes passos:

- Caso não exista o dataset JSON corrigido faz-se:
```bash
$ python3 fix_db.py <dataset_de_compositores>
```

- Abrir um terminal e correr o comando `json-server --watch fix_<nome_dataset>.json` de modo a iniciar o json-server para a utilização do axios no node.js

- Abrir outro terminal e correr o comando `node server.js` de modo a iniciar o serviço.

Após estes dois passos é só necessário abrir um browser e pesquisar por `http://localhost:5030`.
