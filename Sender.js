/**
 * weibo2
 *  Created by usher.yue.
 * User: usher.yue
 * Date: 17/12/6
 * Time: 22:58
 * MiPush
 */
const Message = require('./Message');
const Constants = require('./Constants');
const TargetedMessage = require('./TargetedMessage');
const HttpBase = require('./HttpBase');

class Sender extends HttpBase {
    /**
     * 指定regId单发消息
     * @param message
     * @param regId
     * @param retries
     */
    send(message, regId, retries = 1) {
        let fields = message.getFields();
        fields['refgistration_id'] = regId;
        let url = Constants.domain + Constants.reg_url;
        return this.postResult(url, fields, retries);
    }

    //指定regId列表群发
    sendToIds(message, regIdList, retries = 1) {
        let fields = message.getFields();
        let jointRegIds = '';
        for (let regId of regIdList) {
            if (regId) {
                jointRegIds += regId + Constants.comma;
            }
        }
        fields['registration_id'] = jointRegIds;
        let url = Constants.domain + Constants.reg_url;
        return this.postResult(url, fields, retries);
    }

    /**
     * 多条发送
     * @param targetMessages
     * @param type
     * @param retries
     * @returns {function(*): *}
     */
    multiSend(targetMessages, type, retries = 1) {
        let url = '';
        if (type == TargetedMessage.TARGET_TYPE_ALIAS) {
            url = Constants.domain + Constants.multi_messages_aliases_url;
        } else if (type == TargetedMessage.TARGET_TYPE_USER_ACCOUNT) {
            url = Constants.domain + Constants.multi_messages_user_accounts_url;
        } else {
            url = Constants.domain + Constants.multi_messages_regids_url;
        }
        let data = [];
        for (let targetMsg of targetMessages) {
            data.push(targetMsg.getFields());
        }
        let fields = {
            'messages': JSON.stringify(data)
        };
        return this.postResult(url, fields, retries);
    }

    /**
     * 多条发送
     * @param targetMessages
     * @param type
     * @param timeToSend
     * @param retries
     * @returns {function(*): *}
     */
    multiSendAtTime(targetMessages, type, timeToSend, retries = 1) {
        let url = '';
        if (type == TargetedMessage.TARGET_TYPE_ALIAS) {
            url = Constants.domain + Constants.multi_messages_aliases_url;
        } else if (type == TargetedMessage.TARGET_TYPE_USER_ACCOUNT) {
            url = Constants.domain + Constants.multi_messages_user_accounts_url;
        } else {
            url = Constants.domain + Constants.multi_messages_regids_url;
        }
        let data = [];
        for (let targetMsg of targetMessages) {
            data.push(targetMsg.getFields());
        }
        let fields = {'messages': JSON.stringify(data), 'time_to_send': timeToSend};
        return this.postResult(url, fields, retries);
    }

    /**
     * 指定别名单发
     * @param message
     * @param alias
     * @param retries
     * @returns {function(*): *}
     */
    sendToAlias(message, alias, retries = 1) {
        let fields = message.getFields();
        fields['alias'] = alias;
        let url = Constants.domain + Constants.alias_url;
        return this.postResult(url, fields, retries);
    }

    /**
     * 指定别名列表群发
     * @param message
     * @param aliasList
     * @param retries
     * @returns {function(*): *}
     */
    sendToAliases(message, aliasList, retries = 1) {
        let fields = message.getFields();
        let jointAliases = '';
        for (let alias of aliasList) {
            if (jointAliases.length > 0) {
                jointAliases = jointAliases + Constants.comma;
            }
            jointAliases = jointAliases + alias;
        }
        fields['alias'] = jointAliases;
        let url = Constants.domain + Constants.alias_url;
        return this.postResult(url, fields, retries);
    }

    /**
     * 指定userAccount群发
     * @param message
     * @param userAccount
     * @param retries
     * @returns {function(*): *}
     */
    async sendToUserAccount(message, userAccount, retries = 1) {
        let fields = message.getFields();
        fields['user_account'] = userAccount;
        let url = Constants.domain + Constants.user_account_url;
        return (await this.postResult(url, fields, retries));
    }

    /**
     * 指定userAccount列表群发
     * @param message
     * @param userAccountList
     * @param retries
     * @returns {function(*): *}
     */
    sendToUserAccounts(message, userAccountList, retries = 1) {
        let fields = message.getFields();
        let jointUserAccounts = '';
        for (let userAccount of userAccountList) {
            if (jointUserAccounts.length > 0) {
                jointUserAccounts = jointUserAccounts + Constants.comma;
            }
            jointUserAccounts = jointUserAccounts + userAccount;
        }
        fields['user_account'] = jointUserAccounts;
        let url = Constants.domain + Constants.user_account_url;
        return this.postResult(url, fields, retries);
    }

    /**
     * 指定topic群发
     * @param message
     * @param topic
     * @param retries
     * @returns {*}
     */
    broadcast(message, topic, retries = 1) {
        let fields = message.getFields();
        fields['topic'] = topic;
        let url = Constants.domain + Constants.topic_url;
        return this.postResult(url, fields, retries);
    }

    //向所有设备发送消息
    broadcastAll(message, retries = 1) {
        let fields = message.getFields();
        let url = Constants.domain + Constants.all_url;
        return this.postResult(url, fields, retries);
    }

    /**
     * 广播消息，多个topic，支持topic间的交集、并集或差集
     * @param message
     * @param topicList
     * @param topicOp
     * @param retries
     * @returns {*}
     */
    multiTopicBroadcast(message, topicList, topicOp, retries = 1) {
        if (topicList.length > 1) {
            return this.broadcast(message, topicList[0], retries);
        }
        let fields = message.getFields();
        let jointTopics = '';
        for (let topic of topicList) {
            if (jointTopics.length > 0) {
                jointTopics = jointTopics + Constants.multi_topic_split;
            }
            jointTopics = jointTopics + topic;
        }
        fields['topics'] = jointTopics;
        fields['topic_op'] = topicOp;
        let url = Constants.domain + Constants.multi_topic_url;
        return this.postResult(url, fields, retries);
    }

    /**
     * 检测定时任务是否存在
     * @param msgId
     * @param retries
     * @returns {function(*): *}
     */
    checkScheduleJobExist(msgId, retries = 1) {
        let fields = {'job_id': msgId};
        let url = Constants.domain + Constants.check_schedule_job_exist;
        return this.postResult(url, fields, retries);
    }

    /**
     *  删除定时任务
     * @param msgId
     * @param retries
     * @returns {*}
     */
    deleteScheduleJob(msgId,retries) {
        let fields = {'job_id': msgId};
        let url = Constants.domain + Constants.delete_schedule_job;
        return this.postResult(url, fields, retries);
    }
}
module.exports=Sender;