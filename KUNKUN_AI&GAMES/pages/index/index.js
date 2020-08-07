var WxAutoImage = require('../../utils/wxAutoImageCal.js');
var app = getApp();

Page({
    data: {
        imgUrls: [
            '../../images/bar/home.png',
            '../../images/bar/home.png',
            '../../images/bar/home.png'
        ],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
    },
    cusImageLoad: function(e){
        var that = this;
        that.setData(WxAutoImage.wxAutoImageCal(e));
    },
    PictureDetail0:function(){
      wx.navigateTo({
        url: '../PictureDetail/PictureDetail?id=0',
      })
    },
    PictureDetail1:function(){
      wx.navigateTo({
        url: '../PictureDetail/PictureDetail?id=1',
      })
    },
    beautyPicture0:function(){
      wx.navigateTo({
        url: '../beautyPicture/beautyPicture?id=0',
      })
    },
    beautyPicture1:function(){
      wx.navigateTo({
        url: '../beautyPicture/beautyPicture?id=1',
      })
    },
    FontDetail0:function(){
      wx.navigateTo({
        url: '../beautyPicture/beautyPicture?id=1',
      })
    },
    FontDetail1:function(){
      wx.navigateTo({
        url: '../beautyPicture/beautyPicture?id=1',
      })
    },
    SaoLei:function(){
      wx.navigateTo({
        url: '../saolei/saolei',
      })
    },
    ChiMa:function(){
      wx.navigateTo({
        url: '../chima/chima',
      })
    },
    WuZiQi:function(){
      wx.navigateTo({
        url: '../wuziqi/wuziqi',
      })
    },
    Bird:function(){
      wx.navigateTo({
        url: '../bird/bird',
      })
    },

    Snake:function(){
      wx.navigateTo({
        url: '../snake/snake',
      })
    },
    2048:function(){
      wx.navigateTo({
        url: '../2048/2048',
      })
    },
    Plain:function(){
      wx.navigateTo({
        url: '../plain/plain',
      })
    },
    BlackBlock:function(){
      wx.navigateTo({
        url: '../blackwhieblock/index/index',
      })
    }
})