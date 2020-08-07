
var app = getApp();
var qqmap = require('../../utils/qqmap-wx-jssdk.min.js');
Page({ 
    data:{
        temp:"",
        temperature:"",
        type:"",
        city:"",
        date:"",
        direction:"",
        condition:'10',
        futureArray:'[]',
        address:"",
    },
    onShow : function(){
      this.setData({
        city:"正在获取，请稍后"
     
      });
    },
  
    onLoad:function(){
        var that = this;
        var result = "正在获取，请稍后";
        var demo = new qqmap({
          key: '4HYBZ-EB23D-SLC42-HQ5R3-LP3LQ-OZFU5'//腾讯地图你注册后给你的key值
         })
          wx.getLocation({
            type: 'gcj02',  //编码方式，
            success: function (res) {
              var latitude = res.latitude   // wx.getLocation 获取当前的地理位置、速度   latitude(维度)  longitude（经度）
              var longitude = res.longitude
              demo.reverseGeocoder({  
                      //腾讯地图api 逆解析方法 首先设计经纬度
                location: {
                  latitude: res.latitude,
                  longitude: res.longitude
                },
      　　　　　　　　　　//逆解析成功回调函数
                success: function (res) {
                  that.setData({
                    city:  res.result.address_component.city.substring(0, 2)//这是可以直接获取到当前城市位置
                  });
                  app.globalData.usercity=res.result.address_component.city.substring(0, 2);
                  that.GetWeather(res.result.address_component.city.substring(0, 2));
                },
                fail: function (res) {
      　　　　　　　　　//失败的回调函数
                    // console.log(res);
                },
               });
        
            }
        }); 
        
       
    },
    GetWeather: function(city){
      var that = this;
      var result = null;
      var usercity = city;
      //city=city.replace("市","");
      wx.request({
        url: "https://apis.juhe.cn/simpleWeather/query?",
          data: {
            city:usercity,
            key:"42a1244a26952dff31e58d3eca16527f"
          },
          success(res) {
            result = res.data.result;
            var test1 = JSON.stringify(result);
        
            that.setData({
                city: res.data.result.city,
                temp: res.data.result.realtime.temperature,
                temperature: res.data.result.future[0].temperature,
                type: res.data.result.future[0].weather,
                direction: res.data.result.future[0].direct,
                date: res.data.result.future[0].date,
                futureArray: res.data.result.future,
            });
         
          }
      })
    },

})
