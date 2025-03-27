import fs from 'fs';
import sharp from 'sharp';
import express from 'express';
import cookieParser from 'cookie-parser';
import mcping from 'mc-ping-updated';

let app = express();

app.use(cookieParser());
let port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/* ROUTING */

app.get('/components/:file', (req, res) => { 
  res.setHeader('Content-Type', 'text/html');
  res.sendFile('./src/public/components/' + req.params.file, { root: '.' });

  // res.send(req.params.file);
});

app.get('/', (req, res) => { res.sendFile('./src/public/index.html', { root: '.' }); });

app.get('/index', (req, res) => { res.redirect('/'); });
app.get('/index.html', (req, res) => { res.redirect('/'); });

app.use('/styles', express.static('./src/public/styles/'));
app.use('/scripts', express.static('./src/public/scripts/'));

app.use('/uploads', express.static('./data/uploads/'));

app.use('/styles/components', express.static('./src/public/styles/components/'));

app.get('/ping/:ip', (req, res) => { 
    mcping(req.params.ip, 25565, function(err, response) {
        if (err) {
            // Some kind of error
            console.error(err);
        } else {
            // Success!
            res.send(response);
            
        }
    }, 3000);
 });



/* API */

var servers = JSON.parse(fs.readFileSync('./data/servers.json'));

for (let server in servers) {
  /* check online */
}

app.get('/api/servers', (req, res) => { 
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(servers));
  });

app.listen(port, () => {
  console.log(`START APP port ${port}`);
});