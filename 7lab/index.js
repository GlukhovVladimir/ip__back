const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const { Dropbox } = require('dropbox')
const fs = require('fs')
const fetch = require('node-fetch')
const App_key = 'vx96x0a1zle36re'
const App_secret = 'l9ckeai6rgk2yll'

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});

app.get('/main', function(req, res) {
    res.sendFile(__dirname + '/public/main.html');
});

app.post('/main', function(req, res) {
    res.redirect(`https://www.dropbox.com/oauth2/authorize?client_id=${App_key}&response_type=code&redirect_uri=http://localhost:3000/auth`);
});

app.get('/auth', function (req, res) {
    const options = {
        body: `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:3000/auth`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${App_key}:${App_secret}`, 'utf8').toString('base64')
        }
    };
    fetch('https://api.dropbox.com/1/oauth2/token', options)
    .then( res => res.json())
    .then( data => res.render('getToken.html', {access_token: data.access_token, expires_in: data.expires_in, token_type: data.token_type, account_id: data.account_id}));
});

app.post('/getFoldersAndFiles', async function(req, res) {
    const dbx = new Dropbox({ accessToken: req.body.access_token });
    const response = await dbx.filesListFolder({ path: '' })
    var files = [], folders = []
    for (var i = 0; i < response.result.entries.length; i++) {
        var name = response.result.entries[i].name
        if (path.extname(name) == '') {
            folders.push(name)
        } else {
            files.push(name)
        }
    }
    var foldersStr = folders.join(', ')
    var filesStr = files.join(', ')
    res.render('getFoldersAndFiles.html', { folders: foldersStr, files: filesStr })
});

app.post('/download', function(req, res) {
    const dbx = new Dropbox({ accessToken: req.body.access_token});
    dbx.sharingGetSharedLinkFile({ url: req.body.shared_link })
    .then((data) => {
        fs.writeFile(data.result.name, data.result.fileBinary, (err) => {
            if (err) { throw err; }
            res.render('response.html', {response: data.result.name, operation: 'saved'});
        });
    })
});

app.post('/upload', function(req, res) {
    const dbx = new Dropbox({ accessToken: req.body.access_token});
    const filename = req.body.filename;
    fs.readFile(path.join(__dirname, '/' + filename), (err, contents) => {
        if (err) { throw err; }
        dbx.filesUpload({ path: '/' + filename, contents })
        .then((response) => {
            res.render('response.html', {response: filename, operation: 'uploaded'});
        })
    });
});