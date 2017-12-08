/**
 * weibo2
 *  Created by usher.yue.
 * User: usher.yue
 * Date: 17/12/7
 * Time: 18:41
 */
const Constants = require('./Constants');
const Result = require('./Result');
const Http = require('https');
const {URL} = require('url');
const QueryString = require('querystring');

class HttpBase {
    constructor() {
        this.appSecret = Constants.secret;
    }

    /**
     * 发送post请求
     * @param url
     * @param fields
     * @param retries
     */
    async postResult(url, fields, retries) {
        let result = new Result(await this.postReq(url, fields));
        if (result.getErrorCode() == 0) {
            return result;
        }
        //重试
        for (var i = 0; i < retries; i++) {
            result = new Result(await this.postReq(url, fields));
            if (result.getErrorCode() == 0) {
                break;
            }
        }
        return result;
    }

    /**
     * 发送get请求
     * @param url
     * @param fields
     * @param timeout
     * @returns {Promise}
     */
    postReq(url, fields, timeout = 3) {
        var $this = this;
        return new Promise(function (resolve, reject) {
            let urlSchema = new URL(url);
            let postData = QueryString.stringify(fields);
            var req = Http.request({
                method: 'post',
                'host': urlSchema.hostname,
                'port': urlSchema.port ? urlSchema.port : 443,
                'path': urlSchema.pathname,
                'timeout': timeout * 1000,
                headers: {
                    'Authorization': `key=${$this.appSecret}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }, (res) => {
                if (res.statusCode == 200) {
                    var body = "";
                    res.on('data', (chunk) => {
                        body += chunk.toString();
                    })
                    res.on('end', (res) => {
                        resolve(body);
                    });
                } else {
                    reject(false);
                }
            });
            req.on('error', (err) => {
                console.log(err)
                reject(false);
            })
            req.write(postData);
            req.end();
        });
    }

}


// let httpBase = new HttpBase();
// httpBase.postReq('http://127.0.0.1:3001/private/dynamic/thumbup', {type:0,dynamicid:90161,uid:1033145705652157622}, 10).then(function (data) {
//     console.log(data)
// }).catch(function (err) {
//     console.log(err)
// });

module.exports = HttpBase;