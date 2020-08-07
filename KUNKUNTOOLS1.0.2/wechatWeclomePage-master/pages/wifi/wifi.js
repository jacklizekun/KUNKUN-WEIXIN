// 获取小程序实例
var app = getApp()

Page({
    // 数据
    data: {
        hasNetworkType: false,
        systemInfo: {},

    },
    onLoad: function() {
      
    },
 /* 获取 网络类型函数 */
    getNetworkType: function() {
        var that = this;
        // 调取 网络类型API
        wx.getNetworkType({
            success: function(res) {
                console.log(res)
                that.setData({
                    hasNetworkType: true,
                    networkType: res.networkType
                })
            }
        })
    },
    // 清除 网络状态的数据
    clear: function() {
        this.setData({
            hasNetworkType: false,
            networkType: ''
        })
    },
/* 获取 系统信息函数 */
    getSystemInfo: function() {
        var that = this;
        // 调取 系统信息API
        wx.getSystemInfo({
            success: function(res) {
                console.log(res)
                that.setData({
                    systemInfo: res
                })
            }
        });
     
    }

})