/**
 * weibo2
 *  Created by usher.yue.
 * User: usher.yue
 * Date: 17/12/6
 * Time: 22:24
 * Message
 */

class Message {
    constructor() {
        this.extra = {};//可选项，额外定义一些key value（字符不能超过1024，key不能超过10个）
        this.fields = {};//含有本条消息所有属性的数组
        this.payload = '';				//消息内容
        this.restricted_package_name = '';	        //支持多包名
        this.pass_through = 0;			//是否透传给app(1 透传 0 通知栏信息)
        this.notify_type = 0;				//通知类型 可组合 (-1 Default_all,1 Default_sound,2 Default_vibrate(震动),4 Default_lights)
        this.notify_id = 0;				//0-4同一个notifyId在通知栏只会保留一条
        this.description = '';				//在通知栏的描述，长度小于128
        this.title = '';					//在通知栏的标题，长度小于16
        this.time_to_live = 0;			//可选项，当用户离线是，消息保留时间，默认两周，单位ms
        this.time_to_send = 0;			//可选项，定时发送消息，用自1970年1月1日以来00:00:00.0 UTC时间表示（以毫秒为单位的时间）。
        this.json_infos = {};

    }
     getFields() {
        return this.fields;
    }
     getJSONInfos() {
        return this.json_infos;
    }
}
Message.EXTRA_PREFIX = 'extra.';
/* IOS 使用 */
Message.sound_url = 'default';			//可选，消息铃声
Message.badge = 0;				//可选，自定义通知数字角标
module.exports=Message;
