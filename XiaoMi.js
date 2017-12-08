/**
 * weibo2
 *  Created by usher.yue.
 * User: usher.yue
 * Date: 17/11/9
 * Time: 11:07
 * 心怀教育梦－烟台网格软件技术有限公司
 */
////////////////////////////////XiaoMi Push Task//////////////////////////////
//////
///// 待开发
//////
/////
/////
//////////////////////////Common Push Task///////////////////////
class XiaoMiPush {
    /**
     *  推送到Android
     */
    static async pushToAndroid(sender) {
        if(config.debug.androidPush)
            console.log(`Android XiaoMi Push Message:${sender}`)
    }

    /**
     *推送IOS
     */
    static async pushToIos(sender) {
        if(config.debug.iosPush)
            console.log(`IOS XiaoMi Push Message:${sender}`)
    }

}

module.exports = {

    /**
     * 通过小米推送推送数据,后期考虑队列优化。
     * @param sender
     */
    pushDataToApp: (sender) => {

         XiaoMiPush.pushToAndroid(JSON.stringify(sender));
         XiaoMiPush.pushToIos(JSON.stringify(sender));
        return true;
    },


};