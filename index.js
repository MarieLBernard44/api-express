const bodyParser = require('body-parser');
const express = require('express');
const faker = require('faker');
const app = express();

/**
 * Initialisation de body parser
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
 * Permet de récuparer un liste de données
 */
app.get('/users', (req, res) => res.json({
    data: users
}));

/**
 * Permet de récupérer une donnée à partir d'une liste
 */
app.get('/users/:id', (req, res) => {
    const index = req.params.id - 1;

    res.json({
        data: users[index]
    });
});

/**
 * Permet d'ajouter un nouvel utilisateur
 */
app.post('/users', (req, res) => {
    const data = req.body;

    console.log(data);

    users.push(data);

    const index = users.length;

    res.json({
        index: index,
        data: users[index - 1]
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));