/**
 * weibo2
 *  Created by usher.yue.
 * User: usher.yue
 * Date: 17/12/8
 * Time: 12:38
 * 小米推送助手
 */
const Constants = require('./Constants');
const Sender = require('./Sender');
const IOSBuilder = require('./IOSBuilder');
const Builder = require('./Builder');

class XiaoMiPush {
    /**
     *推送到Android
     * @param package
     * @param secret
     * @param userAccount
     * @param title
     * @param payload
     * @returns {Promise.<*>}
     */
    static async pushToAndroid($package, secret, userAccount, title, payload) {
        Constants.setPackage($package);
        Constants.setSecret(secret);
        let sender = new Sender();
        let message = new Builder();
        //开启httpdebug
        sender.setDebug(true);
        // 通知栏的title
        message.Title(title);
        //打开app
        message.Extra(Builder.notifyEffect, 1);
        // 通知栏的descption
        message.Description(title);
        // 这是一条通知栏消息，如果需要透传，把这个参数设置成1,同时去掉title和descption两个参数
        message.PassThrough(0);
        // 携带的数据，点击后将会通过客户端的receiver中的onReceiveMessage方法传入。
        message.Payload(payload);
        // 应用在前台是否展示通知，如果不希望应用在前台时候弹出通知，则设置这个参数为0
        message.Extra(Builder.notifyForeground, 1);
        // 通知类型。最多支持0-4 5个取值范围，同样的类型的通知会互相覆盖，不同类型可以在通知栏并存
        message.NotifyId(0);
        message.Build();
        return (await sender.sendToUserAccount(message, userAccount)).getErrorCode();
    }

    /**
     * 推送内容到ios
     * @param bundleId
     * @param secret
     * @param userAccount
     * @param title
     * @param payload
     * @returns {Promise.<*>}
     */
    static async pushToIos(bundleId, secret, userAccount, title, payload) {
        Constants.setBundleId(bundleId);
        Constants.setSecret(secret);
        let sender = new Sender();
        let message = new IOSBuilder();
        //开启httpdebug
        sender.setDebug(true);
        message.Description(title);
        message.Extra('payload', payload);
        message.SoundUrl('default');
        message.Badge('4');
        message.Build();
        let errCode = (await sender.sendToUserAccount(message, userAccount)).getErrorCode();
        return errCode;
    }
}

module.exports = XiaoMiPush;