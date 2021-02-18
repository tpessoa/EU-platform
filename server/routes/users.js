const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/ping').get((req, res) => {
    
 
    res.send('ollaaaaa');
});

router.route('/ping/:imgName').get((req, res) => {
    var imgName = req.params.imgName;
 
    res.send(`
    <link rel="stylesheet" type="text/css" href="/css/style.css">
    <h1>Hey :)</h1>
    <img
    src="/images/${imgName}"
    style="height:300px;"/>
    <p>sf</p>`);
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    console.log(username);
    const newUser = new User({ username });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error ' + err));
})

module.exports = router;