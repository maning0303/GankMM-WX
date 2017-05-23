// pages/gank/oneDay/oneDay.js
var time = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultsAndroid: [],
    resultsIOS: [],
    resultsVideo: [],
    resultsExpand: [],
    resultsOther: [],
    imageUrl:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    time = options.time;

    var strs = new Array(); //定义一数组 
    strs = time.split("-");
    var year = strs[0];
    var month = strs[1];
    var day = strs[2];
    var url = 'http://gank.io/api/day/' + year + '/' + month + '/' + day
    console.log(url)

  var that = this;

    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
           imageUrl:res.data.results.福利[0].url,
           resultsAndroid: res.data.results.Android,
           resultsIOS: res.data.results.iOS,
           resultsVideo: res.data.results.休息视频,
           resultsExpand: res.data.results.拓展资源,
           resultsOther: res.data.results.瞎推荐,
        })
      }
    })


  },


  onReady: function () {
    //动态设置标题
    wx.setNavigationBarTitle({
      title: time,
    })
  },

  bindItemClick:function(e){
    console.log(e)
    var itemData = e.currentTarget.dataset.content
    //跳转详情页面
    wx.navigateTo({
      url: '../detail/detail?title=' + itemData.desc + "&url=" + itemData.url,
    })
  }

  
})