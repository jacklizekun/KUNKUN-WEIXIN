const utils = require('./util.js');
let changeSetUrl = 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facedecoration'; //一键变装
let facesTickerUrl = 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facesticker'; //大头贴

/** ------------------------------------------人脸变装接口 start ------------------------------------------------------- */
let changeFaceSetRequest = (base64Img, decoration = 1, callback) => {
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
    decoration: decoration //变装编码1-23
  }
  params['sign'] = utils._genRequestSign(params)

  utils.postAjax(changeSetUrl, params, callback);
}
/** ------------------------------------------人脸变装接口 end --------------------------------------------------------- */
/** ------------------------------------------大头贴接口 start ------------------------------------------------------- */
let facesTickerRequest = (base64Img, sticker = 1, callback) => {
  //拼接鉴权必须的参数
  let params = {
    app_id: utils.app_id,
    image: base64Img,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
    sticker: sticker //大头贴编码1-23
  }
  params['sign'] = utils._genRequestSign(params)

  utils.postAjax(facesTickerUrl, params, callback);
}
/** ------------------------------------------大头贴接口 end --------------------------------------------------------- */

module.exports = {
  changeFaceSetRequest: changeFaceSetRequest,
  facesTickerRequest: facesTickerRequest,


}