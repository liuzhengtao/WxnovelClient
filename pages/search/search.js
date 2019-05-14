// pages/search/search.js
const util = require('../../utils/util.js')
const app = getApp()
const baseurl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var b_name = "重生之";
    util.get_curl(baseurl + '/books/get_books_name', { 'b_name': b_name }, function (res) {
      that.setData({ "books_list": res.data.list });
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
  onShow: function () {

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
  bindSearchInputTab:function(e){
    var that =this;
     var inputValue = e.detail.value;
    that.setData({ "searchValue": inputValue});
  },
  bindSearchTap: function (e) {
    var that = this;
    var b_name = e.target.dataset.value;
    util.get_curl(baseurl + '/books/get_books_name', { 'b_name': b_name}, function (res) {
      that.setData({ "books_list": res.data.list});
    });
  }
})