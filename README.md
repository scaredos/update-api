# update-api
A simple API to update a list of servers all at once

## Configuration
- To setup, you must first edit `master.js` to include a list of servers to send requests to. I will refer to these as the **child servers**. 
```node
const daughterServers = new Map([
  ['Node 0', 'http://127.0.0.1:11100/update']
  ['Node 1', 'http://127.0.0.2:3000/update']
])
```
- Next, in the `master.js` file, you need to edit the authentication keys. These keys are used to prevent spam towards your servers.
- - The master key you set must be also placed inside of the `child.js` file.
```node
const masterKey = 'XXXX'; 
const childKeys = 'XXXX'; 
```
- Next, you must edit the list of commands in both files. There is no limit to how many commands you can store.
```node
const commands = ['command to run', 'another command to run', 'last command to run'];
```
- Finally, you must set the environment variable `NODE_ENV` to production
```bash
# WINDOWS 
set NODE_ENV=production
# LINUX 
export NODE_ENV=production
```
## Usage
- On the master server, or the main server to send requests to, you run `node master.js`. The error file `update_api_errors.txt` will be hosted on this server
- On the child server(s), or the servers to send the update requests to, you run `node child.js`. 
