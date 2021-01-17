const router = require('express')();
const f = require('../util/system');
const { messaging: msg } = require('../util/firebase');

/*
    Client-side: https://firebase.google.com/docs/cloud-messaging/js/send-multiple
        -> Shows how to retrieve the client's token so you can send it to the server
        -> https://firebase.google.com/docs/cloud-messaging/js/receive
            -> After subscribing, on client-side, this shows how to connect to messages / notifications.
*/
router.post('/subscribe/', async (req, res) => {
    let token = req.body.token;

    if (token && token.length > 0) {
        try {
            await msg.subscribeToTopic(token, 'game');
            res.json(f.createSuccess());
        } catch (e) {
            res.json(f.createError(`Error in subscribing client to topic: ${e.message}`));
        }
    } else {
        res.json(f.createError('Please provide a valid client token.'));
    }
});

module.exports = router;