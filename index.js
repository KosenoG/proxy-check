const http = require('http');
const request = require('request');
const Agent = require('socks5-http-client/lib/Agent');

const errors = [
    'Bad proxy string',
    'Proxy offline'
];

const proxy_check = p => {

    return new Promise((resolve, reject) => {

        let proxy = {
            host: '',
            port: 0,
            type: 'HTTP',
            user: '',
            pass: ''
        };

        if (typeof p === 'object') {
            if (Array.isArray(p)) {
                if (typeof p[0] === 'object') {
                    proxy = p[0];
                } else if (typeof p === 'string') {
                    p = p[0];
                } else {
                    return reject(errors[0]);
                }
            } else {
                proxy = p;
            }
        }

        if(proxy.type === 'HTTP') {

            var options = {
                host: proxy.host,
                port: proxy.port,
                path: "http://www.ipinfo.io/ip",
                timeout: 6000,
                headers: {
                  Host: "www.ipinfo.io"
                }
              };
              const req = http.get(options, function(res) {
                if (res.statusCode !== 200) {
                    reject(errors[1])
                } else {
                    resolve(true);
                }
              });
              req.on('error', (err) => {
                if(err === 'timeout') {
                    reject(errors[0])
                } else {
                    reject(err || errors[1])
                }
              });
              req.on('timeout', (e) => {
                req.destroy('timeout')
              });
              req.end();

        } else {

            const opt = {
                socksHost: proxy.host,
                socksPort: proxy.port
              }
          
              if(proxy.user && proxy.pass) {
                opt.socksUsername = proxy.user
                opt.socksPassword = proxy.pass
              }
            
            const proxyRequest = {
                agent: new Agent(opt),
                url: 'http://ipinfo.io/ip',
                timeout: 6000
            };
        
            request(proxyRequest, function (err, res) {
                if (err) {
                    reject(errors[0])
                } else if (res.statusCode !== 200) {
                    reject(errors[1])
                } else if (!res.body) {
                    reject('No body');
                } else {
                    resolve(true);
                }
            });
        }
    });
}

module.exports = proxy_check;
