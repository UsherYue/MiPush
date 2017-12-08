/**
 * weibo2
 *  Created by usher.yue.
 * User: usher.yue
 * Date: 17/12/7
 * Time: 22:44
 * 小米推送测试
 */
const XiaoMi=require('../MiHelper');
//将你从小米申请的信息写到这里
XiaoMi.pushToAndroid('package','secret','1033145705652157622','title','payload');
XiaoMi.pushToIos('bundleid','secret','1033145705652157622','title','payload');