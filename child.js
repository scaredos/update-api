// Software Update API | Send one request to automatically update all servers
//
const express = require('express');
const get = require('node-fetch');
const {
  exec
} = require('child_process');

const app = express()
// You should change this port
const port = 11100
const masterKey = 'XXXX'; // This is used to auth replies to the server
const mother = 'http://127.0.0.0:3000/report_error'; // This is used in case of errors
// Commands to run to update the server
const commands = ['echo 0', 'echo 1', 'echo 2'];

app.get('/update', async (req, res) => {
  if (!req.header('Authorization')) {
    res.status(403).send('Unauthorized'); // Send Unauthorized if there is no header
  }
  let tempHeader = req.header('Authorization');
  if (tempHeader != masterKey) {
    res.status(400).send('Bad Request'); // Send bad request if the key is wrong
  } else {
    for (var command of commands) {
      exec(command, async (err, out, stderr) => {
        if (err || stderr) {
          let body = {
            error: err | stderr,
            serverName: req.header('X-Server-Name')
          };
          let request = await get(mother, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
              'Authorization': masterKey
            }
          });
        }
      });
    }
  }
})

app.listen(port, () => console.log('listening'));