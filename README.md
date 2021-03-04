# Check proxy for NodeJS
Simply proxy check HTTP(S)/SOCKS5

### Install
```bash
npm i nodejs-proxy-check
```
### Usage
```javascript
const proxy_check = require('nodejs-proxy-check');

const proxy = {
  host: '10.54.34.22',
  port: 8080,
  type: 'HTTP', // or SOCKS5 default is 'HTTP'
  user: 'user', // if you need auth to SOCKS5
  pass: 'pass' // if you need auth to SOCKS5
};

proxy_check(proxy).then(r => {
  console.log(r); // true
}).catch(e => {
  console.error(e); // ECONNRESET
});
```
