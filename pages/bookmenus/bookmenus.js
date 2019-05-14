// pages/test/test.js
const util = require('../../utils/util.js')
const app = getApp()
const baseurl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    b_id:"",
    chaper_menu_list:[],
    bookname:"",
    index:"0",
    page_count_list:[],
    chaperPage:"1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx:wx.showLoading({
      title: '加载数据中....',
      mask: true,
    })
    var that = this;
    var b_id = options.b_id;
    var b_name = options.b_name;
    app.globalData.bookname=b_name;
    app.globalData.b_id= b_id;
    util.get_curl(baseurl + '/books/get_chapers_with_book_id', { 'b_id': b_id, 'page': '1' }, function (res) {
      wx:wx.hideLoading();
      that.setData({ "chaper_menu_list": res.data.list, "bookname": b_name, "b_id": b_id, "cat_name": options.cat_name});
    });
    util.get_curl(baseurl + '/books/get_counts_book_id', { 'b_id': b_id},function(res){
        var counts = res.data.counts;
        var onepagecount = res.data.onePageCount;
        var pageCounts=[];
        var index=0;
      if (parseInt(counts)%2==0){
         index = parseInt(counts) / parseInt(onepagecount)
      }else{
         index = (parseInt(counts)+1) / parseInt(onepagecount)
      }
      for(var i=0;i<=index;i++){
         pageCounts[i]=i+1;
      }
      that.setData({"page_count_list":pageCounts});
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this;
    var books_list = app.globalData.books_list;
    var b_ids = []
    for (var i=0;i<books_list.length;i++){
         var  onebook = books_list[i];
         var b_id = onebook.b_id;
         b_ids.push(b_id.toString());
    }
    var b_id = app.globalData.b_id;
    var chaper_id = app.globalData.chaper_id;
    let aShow = wx.getStorageSync('aShow');
    if (!util.IsInArray(b_ids,b_id)) {
      if(aShow){
        wx.showModal({
          title: '加入书架',
          success: function (res) {
            wx.setStorageSync('aShow', false);
            if (res.confirm) {
              util.get_curl(baseurl +'/books/saveOrUpdateBookRack',{'b_id':b_id,'chaper_id':chaper_id,'openid':app.globalData.openid},function(res){
              });
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        }); 
      }
      
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindPickerChange:function(e){
    wx:wx.showLoading({
      title: '加载中。。。',
      mask: true,
    })
    var that = this;
    that.setData({
      index: e.detail.value
    })
    var chaper_page=that.data.page_count_list[e.detail.value]
    var book_name = that.data.bookname;
    util.get_curl(baseurl + '/books/get_chapers_with_book_id', { 'b_id': that.data.b_id, 'page': chaper_page }, function (res) {
      wx:wx.hideLoading();
      that.setData({ "chaper_menu_list": res.data.list});
    });

  }
})