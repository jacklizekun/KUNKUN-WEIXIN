// pages/ocrDetail/index.js
const api = require('../../utils/FontDetail.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '../../images/bar/weather.png',
    type: 0,
    messageList: [],
  },
  bindtaps() {
    const that = this;
    wx.chooseImage({
      count: 1, // 默认9
      //sizeType: ['original', 'compressed'],
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {
        var fs = wx.getFileSystemManager();
        fs.readFile({
          filePath: res.tempFilePaths[0].toString(),
          encoding: 'base64',
          success(response) {
            //获取到图片的base64 进行请求接口
            switch (that.data.type) {
              case 0:
               that.writeCardAi(response.data, that)
                break;
              case 1:
                that.generalCardAi(response.data, that)
              break;
            }
            
          }
        })
      }
    });
  },

 /***************************************手写体检测识别 start ******************************************** */
 writeCardAi(base64Image, that) {
   api.writeRequest(base64Image, {
     success(result) {
       var code = result.ret;
       if (code == 0) {
         wx.hideLoading();
         let msgList = result.data.item_list;
         let messageList = []
         msgList.forEach((_item) => {
           let obj = {};
           obj.key = _item.item;
           obj.value = _item.itemstring
           messageList.push(obj);
         })
         that.setData({
           img: 'data:image/png;base64,' + base64Image,
           messageList: messageList
         })
       } else {
         wx.hideLoading();
         wx.showModal({
           title: '错误提示',
           content: result.msg,
           showCancel: false
         })
       }
     }
   })
 },
 /***************************************手写体检测识别 end ********************************************** */
 /***************************************通用检测识别 start ******************************************** */
 generalCardAi(base64Image, that) {
   api.generalRequest(base64Image, {
     success(result) {
       var code = result.ret;
       if (code == 0) {
         wx.hideLoading();
         let msgList = result.data.item_list;
         let messageList = []
         msgList.forEach((_item) => {
           let obj = {};
           obj.key = _item.item;
           obj.value = _item.itemstring
           messageList.push(obj);
         })
         that.setData({
           img: 'data:image/png;base64,' + base64Image,
           messageList: messageList
         })
       } else {
         wx.hideLoading();
         wx.showModal({
           title: '错误提示',
           content: result.msg,
           showCancel: false
         })
       }
     }
   })
 },
 /***************************************通用检测识别 end ********************************************** */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.type = Number(options.id);
    let title = ''
    switch(this.data.type) {
      case 0:
        title = '手写体识别'
        break;
      case 1:
        title = '通用OCR'
      break;


    }
    wx.setNavigationBarTitle({
      title: title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})