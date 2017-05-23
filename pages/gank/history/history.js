// pages/gank/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mDatas:[],
    isHiddenLoadMoreView:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://gank.io/api/day/history',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          mDatas: res.data.results,
          isHiddenLoadMoreView:true
        })
      }
    })
  },

  onHistoryItemClick:function(e){
    console.log(e)
    var time = e.target.dataset.time;
    //跳转oneDay
    wx.navigateTo({
      url: '../oneDay/oneDay?time='+time,
    })
  }

})