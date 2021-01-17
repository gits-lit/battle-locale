const router = require('express')();
const f = require('../util/system');

router.get('/', async (req, res) => res.json(await f.getUsers(true)));

router.post('/login/', async (req, res) => {
    let username = req.body.name;

    if (username && username.length > 0)
        res.json(await f.loginUser(username));
    else
        res.json(f.createError(`Please provide a username.`));
});

router.get('/u/:name', async (req, res) => {
    let username = req.params.name;

    if (username && username.length > 0)
        res.json(await f.getUser(username));
    else
        res.json(f.createError(`Please provide a username.`));
});

router.get('/getUserHealth', async (req, res) => {
    let username = req.query.name;
    
    if (username && username.length > 0) {
        let data = await f.getUser(username);
        if (data.success) {
            let userData = data.user;

            res.json(f.createSuccess({
                health: userData.health
            }));
        } else {
            res.json(data);
        }
    } else {
        res.json(f.createError(`Please provide a username.`));
    }
});

router.get('/getUserSpells', async (req, res) => {
    let username = req.query.name;
    
    if (username && username.length > 0) {
        let data = await f.getUser(username);
        if (data.success) {
            let userData = data.user;

            res.json(f.createSuccess({
                spells: (userData.spells || [])
            }));
        } else {
            res.json(data);
        }
    } else {
        res.json(f.createError(`Please provide a username.`));
    }
});

module.exports = router;