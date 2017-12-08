/**
 * weibo2
 *  Created by usher.yue.
 * User: usher.yue
 * Date: 17/12/7
 * Time: 19:10
 * 心怀教育梦－烟台网格软件技术有限公司
 */
class Result {
    constructor(jsonStr) {
        this.errorCode = 0;
        this.raw = 0;
        this.data = JSON.parse(jsonStr);
        this.errorCode = this.data['code'];
    }

    getErrorCode() {
        return this.errorCode;
    }

    getRaw() {
        return this.raw;
    }
}
module.exports=Result;
