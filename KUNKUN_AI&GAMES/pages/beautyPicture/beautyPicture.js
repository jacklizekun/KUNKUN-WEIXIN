// pages/pictureDetail/index.js
const api = require('../../utils/beautyPicture.js');
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    img: '../../images/bar/mine.png',
    selectImgageList: utils.filterImgae,
    isShow: false,
    msg: '',
  },
  bindSeeImage() {//预览图片
    const that = this;
    wx.previewImage({
      current: that.data.img,
      urls:[that.data.img]
    })
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
            if(that.data.type === 5) {
              that.facesAgeAi(response.data);
            }else{
              that.setData({
                img: 'data:image/png;base64,' + response.data,
                base64Img: response.data,
                isShow: true
              })
            }
          }
        })
      }
    });
  },
  bindSetPicStyle(e) {
    const that = this;
    let id = e.currentTarget.dataset.id;
    if(id === 0) {
      let img = 'data:image/png;base64,' + that.data.base64Img;
      that.setData({
        img: img
      })
    }else{
      switch(that.data.type) {
        case 0:
          that.changeFaceSetAi(that.data.base64Img, id);
          break;
        case 1:
          that.facesTickerAi(that.data.base64Img, id);
          break;
     
      }
      
    }
    
  },

  /***************************************变妆识别 start ********************************************** */
  changeFaceSetAi(base64Image, cosmetic) {
    const that = this;
    api.changeFaceSetRequest(base64Image, cosmetic, {
      success(result) {
        var code = result.ret;
        if (code == 0) {
          wx.hideLoading();

          that.setData({
            img: 'data:image/png;base64,' + result.data.image
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
  /***************************************变妆识别 end ************************************************ */
  /***************************************大头贴 start ********************************************** */
  facesTickerAi(base64Image, cosmetic) {
    const that = this;
    api.facesTickerRequest(base64Image, cosmetic, {
      success(result) {
        var code = result.ret;
        if (code == 0) {
          wx.hideLoading();

          that.setData({
            img: 'data:image/png;base64,' + result.data.image
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
  /***************************************大头贴 end ************************************************ */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.type = Number(options.id);
    let title = ''
    switch (this.data.type) {
      case 0:
        title = '人脸变装';
        this.setData({ selectImgageList: utils.changeImage });
        break;
      case 1:
        title = '大头贴';
        this.setData({ selectImgageList: utils.purikuraImage });
        break


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