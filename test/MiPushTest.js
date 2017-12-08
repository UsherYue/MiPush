/**
 * weibo2
 *  Created by usher.yue.
 * User: usher.yue
 * Date: 17/12/7
 * Time: 22:44
 * 小米推送测试
 */
const Constants = require('../Constants');
const Sender = require('../Sender');
const IOSBuilder = require('../IOSBuilder');
let test={
    /**
     * ios推送消息
     * @returns {Promise.<*>}
     */
    testIos:async ()=>{
        Constants.setBundleId('your bundledId');
        Constants.setSecret('your xiaoni secret');
        let sender = new Sender();
        let message = new IOSBuilder();
        message.Description('qq');
        message.SoundUrl('default');
        message.Badge('4');
        message.Extra('payload','qqqqqqqq');
        message.build();
        //返回0 推送成功
        let errCode= (await sender.sendToUserAccount(message, '1033145705652157622')).getErrorCode();
        return errCode;
    },
    /**
     * android推送
     * @returns {Promise.<void>}
     */
    testAndroid:async()=>{

    }
}
test.testIos().then(function (v) {
     console.log(v)
});


module.exports=test;