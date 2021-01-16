const router = require('express')();
const db = require('../util/database');

router.get('/', async (req, res) => res.json(await db.getUsers()));

router.post('/login/', async (req, res) => {
    let username = req.body.name;

    if (username && username.length > 0)
        res.json(await db.loginUser(username));
    else
        res.json(db.createError(`Please provide a username.`));
});

router.get('/u/:username', async (req, res) => {
    let username = req.params.name;

    if (username && username.length > 0)
        res.json(await db.getUser(username));
    else
        res.json(db.createError(`Please provide a username.`));
});

module.exports = router;