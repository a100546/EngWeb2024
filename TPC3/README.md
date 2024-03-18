# TPC3: Filmes Americanos

## 2024-02-27

## Autor
- **Id:** A100546
- **Nome:** Tomás Monteiro Sousa

## Enunciado

**Objetivo:** O TPC3 tem como objetivo, a partir de um dataset JSON, com a ajuda de Node.js, json-server e w3.css criar um website em que na página principal apresente ligações para as listas de Filmes, Atores/Atrizes e Géneros de Filmes Americanos. A partir das listas é possível escolher um elemento que terá a sua página única com as suas características.

**Material:** Para este TPC foi fornecido um dataset em JSON com informações de Filmes Americanos. O dataset possui informações sobre filmes individuais, tendo cada filme um id, um titulo, um ano de lançamento e pode conter ou não o elenco e os géneros associados.

**Tópicos a ter em consideração:**
- A página inicial deve apresentar as opções de escolher entre a visualização de Filmes, Atores/Atrizes ou Géneros
- Tendo em conta a opção escolhida, cada página deve apresentar um índice do elemento escolhido ordenado alfabeticamente | Elemento = [Filme,Ator/Atriz,Género]
- Cada elemento da lista deve ter uma hiperligação para uma página individual própria com as suas informações relevantes
    - No caso dos filmes apresenta o Título, Ano de Lançamento e, caso exista, o elenco e os géneros do filme
    - No caso dos Atores/Atrizes e dos Géneros apresenta somente o nome e todos os filmes em que o ator aparece ou que possui o género em causa
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

De modo a conseguir controlar e melhorar o dataset, utilizando o programa `fixDB.py`, fiz algumas alterações.

Dividi o dataset em `movies`, `actors` e `genres` para acesso mais fácil à informação.

Para os `movies`:
- O id deixou de estar aninhado
- Tive em consideração que os Títulos dos Filmes estavam todos corretos
- Filmes com Título e data de lançamento repetidos foram conectados num só filme
- Caso nao existissem Atores/Atrizes ou Géneros estes não são adicionados
- Houve uma seleção para eliminar todos os atores/atrizes que não possuam nomes que comecem com Letra Maiúscula em todos os nomes

Para os `actors`:
- O id é o nome do ator/atriz
- Todos os filmes em que o/a ator/atriz atua são inseridos
- Houve uma seleção para eliminar todos os atores/atrizes que não possuam nomes que comecem com Letra Maiúscula em todos os nomes 

Para os `genres`:
- O id é o género
- Todos os filmes que possuam esse género são inseridos

## Como utilizar?

De modo a obter o website a partir do dataset e do servidor Node.js será necessário fazer os seguintes passos:

- Caso não exista o dataset JSON corrigido faz-se:
```bash
$ python3 fixDB.py <dataset>
```
Onde dataset é o nome do dataset dos Filmes Americanos

- Abrir um terminal e correr o comando `json-server --watch fix_<nome_dataset>.json` de modo a iniciar o json-server para a utilização do axios no node.js

- Abrir outro terminal e correr o comando `node server.js` de modo a iniciar o serviço.

Após estes dois passos é só necessário abrir um browser e pesquisar por `http://localhost:2702`. Uso a porta 2702 pois foi o dia da apresentação do enunciado do TPC3
