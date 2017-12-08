/**
 * weibo2
 *  Created by usher.yue.
 * User: usher.yue
 * Date: 17/12/7
 * Time: 22:44
 * 小米推送测试
 */
const XiaoMi=require('../MiHelper');
XiaoMi.pushToAndroid('package','secret','1033145705652157622','title','payload');
XiaoMi.pushToIos('bundleid','secret','1033145705652157622','title','payload');