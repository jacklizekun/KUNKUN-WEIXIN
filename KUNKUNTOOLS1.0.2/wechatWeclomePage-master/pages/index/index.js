//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    parentItem: [
      {
        itemTiele:"实用查询",
        imgUrls:[
          "../../images/menu/card.png",
          "../../images/menu/ipaddress.png",
            "../../images/menu/phone.png",
            "../../images/menu/bank.png",
        ],
        texts:[
          "身份证",
          "IP地址",
          "手机归属地",
          "银行查询"
        ]
      },
      {
        itemTiele:"日常生活",
        imgUrls:[
          "../../images/menu/figure.png",
          "../../images/menu/print.png",
          "../../images/menu/pinyin.png",
          "../../images/menu/jisuan.png",
        ],
        texts:[
          "身材",
          "画图",
          "拼音",
          "计算",
        ]
      },
      {
        itemTiele:"实用工具",
        imgUrls:[
          "../../images/menu/qrcode.png",
          "../../images/menu/wifi.png",
          "../../images/menu/time.png",
          "../../images/menu/game.png",
        ],
        texts:[
          "二维码",
          "设备信息",
          "时钟",
          "摇骰子",
        ]
      }
    ]
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goTools:function(event){
    var to = event.target.dataset.sel
    var to_str = this.isToUrl[to];
    console.log(to);
    wx.navigateTo({
      url: '../'+to_str+'/'+to_str
    })
  },
  isToUrl : {
    "0-0" : "card",
    "0-1" : "ipaddress",
    "0-2" : "phone",
    "0-3" : "bank",
    "1-0" : "figure",
    "1-1" : "print",
    "1-2" : "pinyin",
    "1-3" : "jisuan",
    "2-0" : "qrcode",
    "2-1" : "wifi",
    "2-2" : "time",
    "2-3" : "shaizi",
   
  },
})
