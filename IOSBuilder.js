/**
 * weibo2
 *  Created by usher.yue.
 * User: usher.yue
 * Date: 17/12/6
 * Time: 22:51
 * 心怀教育梦－烟台网格软件技术有限公司
 */
const Message = require('./Message');
const Constants = require('./Constants');

class IOSBuilder extends Message {

    constructor() {
        super();
        this.soundUrl = 'sound_url';
        this.badge = 'badge';
    }

    Description(description) {
        this.description = description;
    }

    timeToLive(ttl) {
        this.time_to_live = ttl;
    }

    timeToSend(timeToSend) {
        this.time_to_send = timeToSend;
    }

    SoundUrl(url) {
        this.Extra(IOSBuilder.sound_url, url);
    }

    Badge(badge) {
        this.Extra(IOSBuilder.badge, badge);
    }

    Extra(key, value) {
        this.extra[key] = value;
    }

    build() {
        let keys = [
            'description', 'time_to_live', 'time_to_send'
        ];
        for (let key of keys) {
            if (this[key]) {
                this.fields[key] = this[key];
                this.json_infos[key] =  this[key];
            }
        }
        //单独处理extra
        let JsonExtra = {};
            for (var extraKey in this.extra) {
                let extraValue=this.extra[extraKey];
                this.fields[Message.EXTRA_PREFIX + extraKey] = extraValue;
                JsonExtra[extraKey] = extraValue;
            }
        this.json_infos['extra'] = JsonExtra;
    }
}

/* IOS 使用 */
IOSBuilder.sound_url = 'default';			//可选，消息铃声
IOSBuilder.badge = 0;				//可选，自定义通知数字角标
module.exports = IOSBuilder;