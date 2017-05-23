// pages/gank/girl/girl.js

var pageIndex = 1;
var pageSize = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHiddenLoadMoreView:false,
    mDatas:[],
    imageList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadNewData();
  },

  /**
   *  加载最新的数据
   */
  loadNewData:function(){
    this.setData({
      isHiddenLoadMoreView: false,
    })
    var currentThis = this;
    pageIndex = 1;
    wx.request({
      url: 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/' + pageSize +"/" + pageIndex,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        currentThis.handleResults(res.data,0);
      }
    })
  },

  /**
   *  加载更多的数据
   */
  loadMoreData: function () {
    var currentThis = this;
    this.data.imageList = [];
    wx.request({
      url: 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/' + pageSize + "/" + pageIndex,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        currentThis.handleResults(res.data,1);
      }
    })
  },


  handleResults: function (data,flag) {
    console.log(data)
    console.log("flag:" + flag + ",pageIndex:" + pageIndex)
    var length = data.results.length
    for (var i = 0; i < length; ++i) {
      var result = data.results[i]
      result.publishedAt = result.publishedAt.substring(0, 10)
      this.data.imageList.push(result.url);
    }
    var isHiddenLoadMoreView = false
    if (pageSize > length){
      //没有更多数据了
      isHiddenLoadMoreView = true;
    }
    pageIndex ++;
    if (flag == 0){
      //停滞刷新
      wx.stopPullDownRefresh()
      this.setData({
        mDatas: data.results,
        isHiddenLoadMoreView: isHiddenLoadMoreView,
      })
    }else{
      var mDatasBefore = this.data.mDatas  
      this.setData({
        mDatas: mDatasBefore.concat(data.results),
        isHiddenLoadMoreView: isHiddenLoadMoreView,
      })
    }
   
  },

  /**
   * 下拉刷新监听
   */
  onPullDownRefresh: function () {
    console.log('使用全局方法下拉刷新');
    this.loadNewData();
  },

  onReachBottom: function (e) {
    console.log('使用全局方法滑动到了页面底部');
    //判断还有没有更多数据
    if (!this.data.isHiddenLoadMoreView){
      this.loadMoreData();
    }
  },

  // 图片点击
  onImageClick: function (e) {
    console.log(e);
    var currentImageUrl = e.target.dataset.imageUrl;
    wx.previewImage({
      current: currentImageUrl, // 当前显示图片的http链接
      urls: this.data.imageList // 需要预览的图片http链接列表
    })
  }

})