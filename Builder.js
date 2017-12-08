/**
 * weibo2
 *  Created by usher.yue.
 * User: usher.yue
 * Date: 17/12/6
 * Time: 22:36
 */
const Message = require('./Message');
const Constants = require('./Constants');

class Builder extends Message {
    constructor() {
        super();
        this.soundUri = 'sound_uri';
        this.notifyForeground = 'notify_foreground';
        this.notifyEffect = 'notify_effect';
        this.intentUri = 'intent_uri';
        this.webUri = 'web_uri';
        this.flowControl = 'flow_control';
        this.callback = 'callback';
        this.notify_id = 0;
        this.notify_type = -1;
        this.payload = '';
        this.restricted_package_name = Constants.packageName;
    }

    payload(payload) {
        this.payload = payload;
    }

    title(title) {
        this.title = title;
    }

    description(description) {
        this.description = description;
    }

    passThrough(passThrough) {
        this.pass_through = passThrough;
    }

    notifyType(type) {
        this.notify_type = type;
    }

    restrictedPackageNames(packageNameList) {
        let jointPackageNames = '';
        for (let packageName of packageNameList) {
            if (packageName) {
                jointPackageNames += Constants.comma;
            }
        }
        this.restricted_package_name = jointPackageNames;
    }

    timeToLive(ttl) {
        this.time_to_live = ttl;
    }

    timeToSend(timeToSend) {
        this.time_to_send = timeToSend;
    }

    notifyId(notifyId) {
        this.notify_id = notifyId;
    }

    extra(key, value) {
        this.extra[key] = value;
    }

    build() {
        let keys = [
            'payload', 'title', 'description', 'pass_through', 'notify_type',
            'restricted_package_name', 'time_to_live', 'time_to_send', 'notify_id'
        ];
        for (let key of keys) {
            if (this.key) {
                this.fields[key] = this.key;
                this.json_infos[key] = this.key;
            }
        }
        //单独处理extra
        let JsonExtra = new Array();
        if (this.extra.length > 0) {
            for (let {extraKey, extraValue} of this.extra) {
                this.fields[Message.EXTRA_PREFIX + extraKey] = extraValue;
                JsonExtra[extraKey] = extraValue;
            }
        }
        this.json_infos['extra'] = JsonExtra;

    }
}