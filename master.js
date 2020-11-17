// Software Update API | Send one request to automatically update all servers
//
const express = require('express');
const get = require('node-fetch');
const fs = require('fs');
const {
  exec
} = require('child_process');
const helmet = require('helmet');


const app = express()
app.use(helmet())
// You should change this port
const port = 10101
const masterKey = 'XXXX'; // This is the secret key used to authenticate the request
const childKeys = 'XXXX'; // This is the secret key used to authenticate the update

const commands = ['echo 0', 'echo 1', 'echo 2'];

const daughterServers = new Map([
  ['Node 0', 'http://127.0.0.1:11100/update']
  ['Node 1', 'http://127.0.0.2:3000/update']
])

app.get('/update', async (req, res) => {
  if (!req.header('Authorization')) {
    res.status(403).send('Unauthorized'); // Send Unauthorized if there is no header
  }
  let tempHeader = req.header('Authorization');
  if (tempHeader != masterKey) {
    res.status(400).send('Bad Request'); // Send bad request if the key is wrong
  } else {
    for (var [servername, server] of daughterServers.entries()) { // Iterate through map
      let request = await get(server, { // Request each child server
        method: 'get',
        headers: {
          'Authorization': childKeys,
          'X-Server-Name': servername
        }
      });
    }
    for (var command of commands) {
      exec(command, (err, out, stderr) => {
        if (err || stderr) {
          console.error(err | stderr);
          fs.writeFile('update_api_errors.txt', `[MASTER] --> ${err | stderr}`);
        }
      })
    }
  }
})

app.post('/report_error', async (req, res) => {
  if (!req.header('Authorization')) {
    res.status(403).send('Unauthorized'); // Send Unauthorized if there is no header
  }
  let tempHeader = req.header('Authorization');
  if (tempHeader != masterKey) {
    res.status(400).send('Bad Request'); // Send bad request if the key is wrong
  } else {
    let error_string = `[${req.body['serverName']}] --> ${req.body['error']}`
    fs.writeFile('update_api_errors.txt', error_string, (err) => {
      if (err) console.error(err);
    })
  }
})

app.listen(port, () => console.log('listening'));
