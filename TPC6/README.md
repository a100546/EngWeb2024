# TPC6: Compositores de Música (MongoDB|Docker)

## 2024-03-19

## Autor
- **Id:** A100546
- **Nome:** Tomás Monteiro Sousa

## Enunciado

**Objetivo:** O objetivo deste projeto é desenvolver um website para a gestão de compositores. Para isso, serão seguidos os seguintes passos:

- **Configurar a API de dados**: Utilizar o MongoDB para configurar a API a partir do dataset de compositores fornecido
- **Desenvolver a aplicação Web**: Utilizar o Express para criar a aplicação com as seguintes funcionalidades:
   - Implementar operações CRUD (Criar, Ler, Atualizar, Deletar) para gerir os compositores e periodos

**Material:** Usei o dataset que corrigi nos TPCs anteriores de modo a facilitar o processo

**Tópicos a ter em consideração:**
- O MongoDB irá rodar em Docker para facilitar o armazenamento dos datasets
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

- Dataset adicionado com sucesso
- Páginas criadas com sucesso
- Páginas ordenadas alfabeticamente
- Botão de voltar implementado com sucesso
    - Para as listas volta à página inicial
    - Para as páginas individuais volta para a lista do elemento em causa
- Estilização implementada
- Servidor em Express implementado com sucesso
- Website 100% operacional

Modifiquei somente o dataset de forma a ser inserido em mongoDB.

Alterei as instâncias de "id" para "_id" e tranformei o dataset num array de compositores, removendo assim o parâmetro "períodos".

## Como utilizar?

De modo a obter o website a partir do dataset e do servidor será necessário fazer os seguintes passos:

- Primeiramente iniciar o Docker

- De seguida correr os seguintes comandos para adicionar o dataset ao mongoDB:
    - docker cp <ficheiro_json> mongoEW:/tmp
    - docker exec -it mongoEW bash
    - mongoimport -d compositores -c compositores /tmp/<ficheiro_json> --jsonArray

- Abrir outro terminal e correr, dentro da diretoria `AppCompositores` o comando `npm i` de modo a instalar todos os modules necessários para a execução do programa.

- Correr o comando `npm mongoose` de modo a instalar o module correspondente à manipulação do mongoDB

- De seguida, correr o comando `npm start` para iniciar o servidor

Após estes dois passos é só necessário abrir um browser e pesquisar por `http://localhost:1903`
