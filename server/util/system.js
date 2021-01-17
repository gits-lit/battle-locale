const { database: db, messaging: msg } = require('./firebase');
const api = {
    spells: require('./constants/spells'),
    spellTomes: require('./constants/spelltomes'),
    createError: (message, data) => {
        return {
            success: false,
            message,
            ...data
        };
    },
    createSuccess: (data) => {
        return {
            success: true,
            ...data
        };
    },
    // [min, max)
    randomNumber: (min, max) => {
        return Math.random() * (max - min) + min;
    },
    // assume units is in miles (DEFAULT), otherwise units can be "K" (kilometers) or "N" (nautical miles)
    // https://www.geodatasource.com/developers/javascript
    calculateDistance: (lat1, long1, lat2, long2, unit) => {
        if ((lat1 == lat2) && (long1 == long2)) {
            return 0;
        } else {
            let radlat1 = Math.PI * (lat1 / 180);
            let radlat2 = Math.PI * (lat2 / 180);
            let theta = (long1 - long2);
            let radtheta = Math.PI * (theta / 180);

            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1)
                dist = 1;
            
            dist = Math.acos(dist);
            dist *= (180 / Math.PI);
            dist *= (60 * 1.1515);

            if (unit === "K")
                dist *= 1.609344;
            else if (unit === "N")
                dist *= 0.8684;
            
            return dist;
        }
    },
    loginUser: async (username) => {
        let ref = db.ref(`users/${username}`);
        let result = await ref.once('value');
        if (result.exists()) {
            // send notification to all clients so they can update game lobby
            await api.sendNotification({
                event: 'UPDATE'
            });

            return api.createSuccess();
        } else {
            try {
                await ref.set({
                    name: username,
                    health: 0,
                    lat: 0,
                    long: 0,
                    mana: 0,
                    spells: []
                });
                
                // send notification to all clients so they can update game lobby
                await api.sendNotification({
                    event: 'UPDATE'
                });

                return api.createSuccess();
            } catch (e) {
                return api.createError(`Error when creating a new user: ${e.message}`);
            }
        }
    },
    getUser: async (username) => {
        let ref = db.ref(`users/${username}`);
        let result = await ref.once('value');
        if (result.exists()) {
            return api.createSuccess({
                user: result.val()
            });
        } else {
            return api.createError(`User "${username}" does not exist.`);
        }
    },
    getUsers: async () => {
        let ref = db.ref(`users`);
        let result = await ref.once('value');
        if (result.exists()) {
            let users = [];
            for (let [username, data] of Object.entries(result.val()))
                users.push(data);
            
            return api.createSuccess({
                users
            });
        } else {
            // no users
            return api.createSuccess({
                users: []
            });
        }
    },
    sendNotification: (data) => {
        return msg.send({
            topic: 'game',
            notification: {
                title: 'Game Update',
                body: 'UPDATE'
            },
            data
        });
    },
    updateUser: async (username, newData) => {
        // verify the user exists
        let data = await api.getUser(username);
        if (!data.success) return data;

        let ref = db.ref(`users/${username}`);
        try {
            await ref.update(newData);
            
            // send notification to all clients so they can update game lobby
            await api.sendNotification({
                event: 'UPDATE'
            });

            return api.createSuccess();
        } catch (e) {
            return api.createError(`Error when updating user "${username}" data: ${e.message}`);
        }
    },
    createGameStats: async () => {
        let ref = db.ref('gameStats');
        let result = await ref.once('value');
        if (result.exists()) {
            return api.createError('Game has already started.');
        } else {
            try {
                let users = await api.getUsers();
                await ref.set({
                    players: (() => {
                        // convert users object array to string array
                        let list = [];
                        users.forEach(u => list.push(u.name));

                        return list;
                    })(), // to-do: get array of users
                    timeStamp: Date.now(), // in milliseconds!
                    circle: {
                        radius: 0,
                        lat: 0,
                        long: 0
                    }
                });

                // assign each spell tome a random spell
                for (let [tomeId, tomeData] of Object.entries(api.spellTomes))
                    tomeData.spell = api.spells[api.randomNumber(0, api.spells.length)];

                // send notification to all clients so they can update game lobby
                await api.sendNotification({
                    event: 'UPDATE'
                });
                
                return api.createSuccess();
            } catch (e) {
                return api.createError(`Error when creating new game stats: ${e.message}`);
            }
        }
    },
    getGameStats: async() => {
        let ref = db.ref('gameStats');
        try {
            let result = await ref.once('value');
            if (!result.exists()) {
                // create the game stats if it doesn't exist already
                let data = await api.createGameStats();
                if (!data.success) return data;
            }

            let data = result.val();
            /*data.timeStamp = Date.now();

            await ref.update({
                timeStamp: Date.now()
            });*/
            data.amountOfSecondsPassed = (Date.now() - data.timeStamp) / 1000;

            return api.createSuccess({
                stats: data
            });
        } catch (e) {
            return api.createError(`Error when getting game stats: ${e.message}`);
        }
    }
};

module.exports = api;