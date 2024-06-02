# TPC5: Compositores de Música (Express|Jade(PUG))

## 2024-03-12

## Autor
- **Id:** A100546
- **Nome:** Tomás Monteiro Sousa

## Enunciado

**Objetivo:** O objetivo deste TPC é criar uma aplicação para a gestão de uma base de dados de compositores. Para isso, os seguintes passos serão realizados:

- **Montar a API de dados**: Utilizar o json-server para montar a API a partir do dataset de compositores fornecido.
- **Criar a aplicação Web**: Desenvolver a aplicação utilizando Express, com as seguintes características:
   - Implementar operações CRUD (Create, Read, Update, Delete) sobre os compositores
   - Implementar páginas, neste caso, em jade(pug)

A aplicação permitirá a gestão completa dos compositores musicais, oferecendo uma interface para adicionar, visualizar, editar e deletar compositores da base de dados.

**Material:** Usei o dataset que corrigi no TPC anterior de modo a facilitar o processo.

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
- As páginas vão ser implementadas em Jade

## Resultados

- Páginas criadas com sucesso
- Páginas ordenadas alfabeticamente
- Botão de voltar implementado com sucesso
    - Para as listas volta à página inicial
    - Para as páginas individuais volta para a lista do elemento em causa
- Estilização implementada
- Servidor em Express implementado com sucesso
- Website 100% operacional

## Como utilizar?

De modo a obter o website a partir do dataset e do servidor será necessário fazer os seguintes passos:

- Abrir um terminal e correr o comando `json-server --watch <nome_dataset>.json` de modo a iniciar o json-server para a utilização do axios

- Abrir outro terminal e correr o comando `npm i` de modo a instalar todos os modules necessários para a execução do programa.

- De seguida, correr o comando `npm start` para iniciar o servidor.

Após estes dois passos é só necessário abrir um browser e pesquisar por `http://localhost:1203`.
