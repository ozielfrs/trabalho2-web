# Projeto 2 - Desenvolvimento Web - UNIFEI

## ❌ Ainda não tem

Implementação de métodos de atualização no Back-End, implementação de métodos de busca mais específicos no Back-End.
Implementação do Front-End.

## ✔️ Já tem

Banco de Dados completo, implementação parcial do Back-End utilizando o `express.js`.

---

O projeto tem o banco de dados, inserções de dados de exemplo e CRUD (Create, Read, Update and Delete) definidos na pasta [sql](/sql). A documentação do banco e seu diagrama estão presentes na mesma pasta.

Além disso, o código utilizado para o backend da aplicação se encontra na pasta [backend](/backend), as requisições funcionam da seguinte maneira:

- O utilitario indica qual tabela deseja acessar;
- A tabela é acessada e retorna todos os dados possíveis.

Por exemplo, pode-se usar:

```bash
http://localhost:8081/user/?id=1
```

E esse link retornará da tabela "user" os dados do usuário de `id=1`, em um _array_, ou seja, um `json` contido dentro de um _array_. Podem ser adicionadas mais consultas via link, por exemplo:

```bash
http://localhost:8081/user/?id=1&description=lorem
```

E esse link retornará, para cada item da consulta, um _array_ contendo seus dados em `json`, quando em campos de texto, o código busca encontrar ocorrências do texto na coluna de consulta da tabela, quando para busca de ocorrência de valor número o código busca o valor exato, quando para `object` o código tenta convertê-lo em uma data para realizar a checagem e, quando booleano o código tenta encontrar ocorrências de `true` ou `false`.

Um exemplo completo para a tabela de usuários seria:

```bash
http://localhost:8081/user/?id=1&created=2022-12-02&name=oz&description=lorem&deleted=true
```

Que retornaria todos os dados acessíveis passados.

---
