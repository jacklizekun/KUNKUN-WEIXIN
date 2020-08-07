// pages/ocrDetail/index.js
const api = require('../../utils/PictureDetail.js');
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '../../images/bar/home2.png',
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
                that.seeImageAi(response.data, that);
                break;
              case 1:
                that.foodImageAi(response.data, that);
                break;
          
            }

          }
        })
      }
    });
  },
  /***************************************图片识别 start******************************************** */
  seeImageAi(base64Image, that) { //图片识别
    api.seeImageRequest(base64Image, {
      success(result) {
        var code = result.ret;
        if (code == 0) {
          wx.hideLoading();
          let messageList = [
            {key: '结果', value: result.data.text}
          ]
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
  /***************************************图片识别 end ******************************************** */
  /***************************************美食图片识别 start******************************************** */
  foodImageAi(base64Image, that) { //美食图片识别
    api.foodImageRequest(base64Image, {
      success(result) {
        var code = result.ret;
        if (code == 0) {
          wx.hideLoading();
          if(result.data.food) {
            var obj = {key: '结果', value: '是美食'}
          }else{
            var obj = {key: '结果', value: '不是美食'}
          }
          let messageList = [];
          messageList.push(obj);
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
  /***************************************美食图片识别 end ******************************************** */
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.type = Number(options.id);
    let title = ''
    switch (this.data.type) {
      case 0:
        title = '看图说话'
        break;
      case 1:
        title = '美食识别'
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