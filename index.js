const bodyParser = require('body-parser');
const express = require('express');
const faker = require('faker');
const app = express();

/**
 * Permet de créer une liste d'utilisateurs fictifs
 */
const users = [];

for(let i = 0; i < 10; i++) {
    users.push({
        firstname: faker.name.findName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email()
    });
}

/**
 * Initialisation de body parser
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Version de l'API
 */
const versionApi = '/api/v1';

/**
 * Permet de récuparer un liste de données
 */
app.get(`${versionApi}/users`, (req, res) => res.json({
    data: users
}));

/**
 * Permet de récupérer une donnée à partir d'une liste
 */
app.get(`${versionApi}/users/:id`, (req, res) => {
    const index = req.params.id - 1;

    res.json({
        data: users[index]
    });
});

/**
 * Permet d'ajouter un nouvel utilisateur
 */
app.post(`${versionApi}/users`, (req, res) => {
    const data = req.body;

    users.push(data);

    const index = users.length;

    res.json({
        index: index,
        data: users[index - 1]
    });
});

/**
 * Permet la mise à jour d'un utilisateur
 */
app.put(`${versionApi}/users/:id`, (req, res) => {
    const data = req.body;
    const id = req.params.id - 1;

    users[id] = Object.assign(users[id], data);

    res.json({
        data: users[id]
    });
});


/**
 * Permet la suppression d'un utilisateur
 */
app.delete(`${versionApi}/users/:id`, (req, res) => {
    const id = req.params.id - 1;

    users.splice(id, 1);

    res.sendStatus(200);
});

/**
 * Démarrage du serveur
 */
app.listen(3000, () => console.log('Example app listening on port 3000!'));