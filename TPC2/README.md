# TPC2: Escola de Música

## 2024-02-20

## Autor
- **Id:** A100546
- **Nome:** Tomás Monteiro Sousa

## Enunciado

**Objetivo:** Este trabalho tem como objetivo, a partir de um dataset JSON, com a ajuda de Node.js e json-server criar um website em que na página principal apresente ligações para as listas de Alunos, Cursos e Instrumentos presentes na escola. A partir das listas é possível escolher um elemento que terá a sua página única com as suas características. Dependendo da característica esta poderá rederecionar para outra página relativa à mesma.

**Material:** O material fornecido para este trabalho inclui um dataset em JSON sobre uma escola de música. O dataset possui informações respetivamente sobre os alunos, os cursos e os instrumentos presentes na escola de música.

**Tópicos a ter em consideração:**
- A página inicial deve apresentar as opções de escolher entre a visualização de Alunos, Cursos ou Instrumentos
- Tendo em conta a opção escolhida, cada página deve apresentar um índice do elemento escolhido ordenado alfabeticamente | Elemento = [Aluno,Curso,Instrumento]
- Cada elemento da lista deve ter uma hiperligação para uma página individual própria com as suas informações relevantes
- As informações da página individual são obtidas através do mesmo dataset, mas tendo em conta o elemento escolhido
- Cada página individual deverá ter uma hiperligação para voltar à página anterior
- Algumas informações presentes nas páginas individuais podem redirecionar para a página correspondente à característica
- Cada página terá uma estilização básica

## Resultados

- Páginas criadas com sucesso
- Páginas ordenadas alfabeticamente
- Botão de voltar implementado com sucesso
- Estilização básica implementada
- Servidor Node.js implementado com sucesso
- Website 100% operacional

De modo a conseguir controlar melhor o dataset modifiquei o nome do campo  `#text` para `text` em todas as instâncias do dataset. 

## Como utilizar?

De modo a obter o website a partir do dataset e do servidor Node.js será necessário fazer os seguintes passos:

- Abrir um terminal e correr o comando `json-server --watch alunos.json` de modo a iniciar o json-server para a utilização do axios no node.js

- Abrir outro terminal e correr o comando `server.js` de modo a iniciar o serviço.

Após estes dois passos é só necessário abrir um browser e pesquisar por `http://localhost:2002`. Uso a porta 2002 pois foi o dia da apresentação do enunciado do TPC2
