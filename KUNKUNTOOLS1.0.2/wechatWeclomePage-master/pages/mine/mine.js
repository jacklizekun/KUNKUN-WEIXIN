//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    showUp2:true,
    showUp3:true,
    dataList2:[
      {
        startTime:'个人博客',
        experience:'https://blog.csdn.net/weixin_44717095'
      },
      {
        startTime:'个人网站',
        experience:'http://jacklizekun.qicp.vip'
      },
      {
        startTime:'个人GitHub',
        experience:'https://github.com/jacklizekun'
      },
      {
        startTime:'个人微信小程序',
        experience:'本小程序'
      }
    ],
    dataList3:[
      {
        startTime:'2020年7月17日',
        experience:'比赛开题，初识导师'
      },
      {
        startTime:'2020年7月18日~2020年7月19日',
        experience:'头脑风暴，入门小程序'
      },
      {
        startTime:'2020年7月20日~2020年7月21日',
        experience:'感谢物流技术中心大力支持和细心讲解'
      },
      {
        startTime:'2020年7月21日~2020年7月22日',
        experience:'通宵代码40余小时，终是错付比赛'
      },
      {
        startTime:'2020年7月22日~2020年7月25日',
        experience:'青春可以不完美，但每一步没有白走的路'
      }
    ],

  },
  onLoad: function () {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
 
  },
  changeUpDown2:function(e){
    this.setData({
      showUp2:!this.data.showUp2
    })
  },
  changeUpDown3:function(e){
    this.setData({
      showUp3:!this.data.showUp3
    })
  },
})
