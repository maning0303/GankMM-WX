// pages/gank/home/home.js

var curPageIndex = [1, 1, 1]
var pageSize = 10;
var pageType = "Android";
//正在加载更多状态
var isLoadingMore = [false,false,false];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    isHiddenLoadMoreView:[false, false, false],
    mDataAndroid:[],
    mDataIOS: [],
    mDataWeb: [],
    currentTab: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    //加载数据
    this.loadGankData();
  },

  /**
   *  加载更多的数据
   */
  loadGankData: function () {
    isLoadingMore[this.data.currentTab] = true;
    var that = this;
    var pageIndex = curPageIndex[this.data.currentTab]
    var url = 'http://gank.io/api/data/' + pageType + '/' + pageSize + "/" + pageIndex
    console.log("url:"+url)
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.handleResults(res.data);
      }
    })
  },


  handleResults: function (data) {
    console.log(data)
    console.log("pageIndex:" + curPageIndex[this.data.currentTab] + ",pageType:" + pageType)
    var length = data.results.length
    for (var i = 0; i < length; ++i) {
      var result = data.results[i]
      result.publishedAt = result.publishedAt.substring(0, 10)
    }
    //页面++
    curPageIndex[this.data.currentTab]++;
    //刷新页面
    if (this.data.currentTab == 0) {
      this.data.mDataAndroid = this.data.mDataAndroid.concat(data.results);
      console.log(this.data.mDataAndroid)
      this.setData({
        mDataAndroid: this.data.mDataAndroid,
      })
    } else if (this.data.currentTab == 1) {
      this.data.mDataIOS = this.data.mDataIOS.concat(data.results);
      console.log(this.data.mDataIOS)
      this.setData({
        mDataIOS: this.data.mDataIOS
      })
    } else if (this.data.currentTab == 2) {
      this.data.mDataWeb = this.data.mDataWeb.concat(data.results);
      console.log(this.data.mDataWeb)
      this.setData({
        mDataWeb: this.data.mDataWeb
      })
    }
  
    //状态
    isLoadingMore[this.data.currentTab] = false;
  },


  // 滚动到列表底部监听
  onBindscrolltolower: function (e) {
    if (!isLoadingMore[this.data.currentTab]) {
      console.log("加载更多...")
      this.loadGankData();
    }else{
      console.log("正在加载中...")
    }
  },


  // 点击
  onItemClick: function (event) {
    var itemData = event.currentTarget.dataset.item
    console.log(itemData)
    //跳转详情页面
    wx.navigateTo({
      url: '../detail/detail?title=' + itemData.desc + "&url=" + itemData.url,
    })
  },

  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {
    var current = e.detail.current;
    this.changeType(current)
  },

  /** 
  * 点击tab切换 
  */
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var current = e.target.dataset.current
      this.changeType(current)
    }
  },

  changeType: function (current){
    if (current == 0) {
      pageType = "Android"
    } else if (current == 1) {
      pageType = "iOS"
    } else if (current == 2) {
      pageType = "前端"
    }
    this.setData({
      currentTab: current
    });
    //判断是不是空
    if (this.data.mDataIOS.length <= 0 || this.data.mDataWeb.length <= 0) {
      console.log("初始化数据")
      this.loadGankData();
    }
  }

})