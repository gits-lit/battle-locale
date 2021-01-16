const router = require('express')();
const f = require('../util/funcs');
const { render } = require('./users');

router.post('/subtractHealth/', async (req, res) => {
    let username = req.body.name;
    let value = req.body.value;

    if (username && username.length > 0) {
        let data = await f.getUser(username);
        if (data.success) {
            let userData = data.user;

            if (value && value.length > 0) {
                value = parseInt(value);

                if (!isNaN(value)) {
                    res.json(await f.updateUser(username, {
                        health: Math.max(userData.health - value, 0)
                    }));
                } else {
                    // invalid value
                    res.json(f.createError(`The value provided "${req.body.value}" is not a valid value.`));
                }
            } else {
                res.json(f.createError("Please provide a value."));
            }
        } else {
            res.json(data);
        }
    } else {
        res.json(f.createError("Please provide a username."));
    }
});

router.post('/addHealth/', async (req, res) => {
    let username = req.body.name;
    let value = req.body.value;

    if (username && username.length > 0) {
        let data = await f.getUser(username);
        if (data.success) {
            let userData = data.user;

            if (value && value.length > 0) {
                value = parseInt(value);

                if (!isNaN(value)) {
                    res.json(await f.updateUser(username, {
                        health: Math.max(userData.health + value, 0)
                    }));
                } else {
                    // invalid value
                    res.json(f.createError(`The value provided "${req.body.value}" is not a valid value.`));
                }
            } else {
                res.json(f.createError("Please provide a value."));
            }
        } else {
            res.json(data);
        }
    } else {
        res.json(f.createError("Please provide a username."));
    }
});

router.post('/learnSpell/', async (req, res) => {
    let username = req.body.name;
    let tomeId = req.body.spelltome;

    if (username && username.length > 0) {
        let data = await f.getUser(username);
        if (data.success) {
            let userData = data.user;

            if (tomeId && tomeId.length > 0) {
                let tome = f.spellTomes[tomeId];
                if (tome !== undefined) {
                    let spells = (userData.spells || []);

                    // avoid duplicates
                    if (spells.indexOf(tome.spell) < 0)
                        spells.push(tome.spell);

                    res.json(await f.updateUser(username, {
                        spells
                    }));
                } else {
                    res.json(f.createError(`The tome id "${tomeId}" is invalid.`));
                }
            } else {
                res.json(f.createError("Please provide a spell tome ID."));
            }
        } else {
            res.json(data);
        }
    } else {
        res.json(f.createError("Please provide a username."));
    }
});

router.post('/setPlayerCoords/', async (req, res) => {
    let username = req.body.name;
    let lat = req.body.lat;
    let long = req.body.long;

    if (username && username.length > 0) {
        let data = await f.getUser(username);
        if (data.success) {
            if (lat && lat.length > 0) {
                lat = parseInt(lat);

                if (!isNaN(lat)) {
                    if (long && long.length > 0) {
                        long = parseInt(long);

                        if (!isNaN(long)) {
                            res.json(await f.updateUser(username, {
                                lat,
                                long
                            }));
                        } else {
                            res.json(f.createError(`The value provided "${req.body.long}" is not a valid longitude.`));
                        }
                    } else {
                        res.json(f.createError("Please provide a longitude."));
                    }
                } else {
                    res.json(f.createError(`The value provided "${req.body.lat}" is not a valid latitude.`));
                }
            } else {
                res.json(f.createError("Please provide a latitude."));
            }
        } else {
            res.json(data);
        }
    } else {
        res.json(f.createError("Please provide a username."));
    }
});

router.get('/getAllSpellTomes/', async (req, res) => {
    // omit the "spell field" for the front-end
    let tomes = [];
    for (let [tomeId, tomeData] of Object.entries(f.spellTomes))
        tomes.push({
            id: tomeId,
            lat: tomeData.lat,
            long: tomeData.long
        });
    
    res.json(f.createSuccess({
        spellTomes: tomes
    }));
});

router.get('/getCircleInfo/', async (req, res) => {
    let gameData = await f.getGameStats();

    if (gameData.success)
        res.json(f.createSuccess({
            circle: gameData.stats.circle
        }));
    else
        res.json(gameData);
});

module.exports = router;