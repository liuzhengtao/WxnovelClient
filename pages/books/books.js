// pages/books/books.js
const util = require('../../utils/util.js')
const app = getApp()
const baseurl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      cat_name:"",
      book_page:"1",
      books_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var cat_name = options.cat_name;
      wx.setNavigationBarTitle({
        title: cat_name
      })
    util.get_curl(baseurl + '/books/get_books_with_cat_name', { 'cat_name': cat_name, 'page': that.data.book_page},function(res){
      that.setData({"books_list":res.data.list,"cat_name":cat_name});
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
    wx:wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    wx.showNavigationBarLoading();
    var target_page = (parseInt(that.data.book_page) + 1).toString();
    util.get_curl(baseurl + '/books/get_books_with_cat_name', { 'cat_name': that.data.cat_name, 'page': target_page }, function (res) {
      wx: wx.hideNavigationBarLoading();
      that.setData({ "books_list": res.data.list, "book_page": target_page });
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})