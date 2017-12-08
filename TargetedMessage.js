/**
 * weibo2
 *  Created by usher.yue.
 * User: usher.yue
 * Date: 17/12/7
 * Time: 18:35
 * 构建要发送的消息内容和消息的发送目标。
 */
class TargetedMessage {
    constructor() {
        this.targetType = 1;
        this.target = 1;
        this.message = '';
    }

    setTarget(target, targetType) {
        this.targetType = targetType;
        this.target = target;
    }

    setMessage(message) {
        this.message = message;
    }

    getFields() {
        return {
            'target': this.target,
            'message': this.message.getJSONInfos()
        };
    }
}

TargetedMessage.TARGET_TYPE_REGID = 1;
TargetedMessage.TARGET_TYPE_ALIAS = 2;
TargetedMessage.TARGET_TYPE_USER_ACCOUNT = 3;