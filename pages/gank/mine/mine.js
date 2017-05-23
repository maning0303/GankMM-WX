// pages/gank/mine/mine.js
//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  bindClickFeedBack:function(e){
    wx.showToast({
      title: '意见反馈',
      icon: 'info',
      duration: 2000
    })
  }

})