/**
 * weibo2
 *  Created by usher.yue.
 * User: usher.yue
 * Date: 17/12/6
 * Time: 21:51
 * 常量定义
 */
class Constants {
    static setPackage($package) {
        this.packageName = $package;
    }

    static setSecret($secret) {
        this.secret = $secret;
    }

    static setBundleId($bundleId) {
        this.bundle_id = $bundleId;
    }

    static useOfficial() {
        this.domain = 'https://api.xmpush.xiaomi.com';
    }

    static useSandbox() {
        this.domain = 'https://sandbox.xmpush.xiaomi.com';
    }
}

Constants.domain = 'https://api.xmpush.xiaomi.com';
Constants.comma = ',';
Constants.multi_topic_split = ';$;';
Constants.packageName = '';
Constants.bundle_id = '';
Constants.secret = '';
Constants.reg_url = '/v3/message/regid';
Constants.alias_url = '/v3/message/alias';
Constants.user_account_url = '/v2/message/user_account';
Constants.topic_url = '/v3/message/topic';
Constants.multi_topic_url = '/v3/message/multi_topic';
Constants.all_url = '/v3/message/all';
Constants.multi_messages_regids_url = '/v2/multi_messages/regids';
Constants.multi_messages_aliases_url = '/v2/multi_messages/aliases';
Constants.multi_messages_user_accounts_url = '/v2/multi_messages/user_accounts';
Constants.stats_url = '/v1/stats/message/counters';
Constants.message_trace_url = '/v1/trace/message/status';
Constants.messages_trace_url = '/v1/trace/messages/status';
Constants.validation_regids_url = '/v1/validation/regids';
Constants.subscribe_url = '/v2/topic/subscribe';
Constants.unsubscribe_url = '/v2/topic/unsubscribe';
Constants.subscribe_alias_url = '/v2/topic/subscribe/alias';
Constants.unsubscribe_alias_url = '/v2/topic/unsubscribe/alias';
Constants.fetch_invalid_regids_url = 'https://feedback.xmpush.xiaomi.com/v1/feedback/fetch_invalid_regids';
Constants.delete_schedule_job = '/v2/schedule_job/delete';
Constants.check_schedule_job_exist = '/v2/schedule_job/exist';
Constants.get_all_aliases = '/v1/alias/all';
Constants.get_all_topics = '/v1/topic/all';
Constants.UNION = 'UNION';
Constants.INTERSECTION = 'INTERSECTION';
Constants.EXCEPT = 'EXCEPT';
module.exports=Constants;
