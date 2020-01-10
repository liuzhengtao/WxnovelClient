// pages/login/login.js
const util = require('../../utils/util.js')
const app = getApp()
const baseurl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   showModel:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx:wx.showLoading({
      title: '加载中....'
    })
    let that = this;
     wx:wx.login({
       success: function(res) {
         app.globalData.code = res.code;
         app.globalData.userInfo = wx.getStorageSync('userInfo');
         wx:wx.getSetting({
           success: function(res) {
             if (!res.authSetting['scope.userInfo']){
                that.setData({showModel:true});
                wx:wx.hideLoading();
             }else{
               that.setData({ showModel: false });
               if (app.globalData.userInfo==''){
                 that.setData({ showModel: true });
                 wx: wx.hideLoading();
               }else{
                 that.getOp(app.globalData.userInfo);
               }  
             }
           },
           fail: function(res) {},
           complete: function(res) {},
         })
       }
     })
  },
  getOp: function (res) {
    let that = this;
    let userInfo = res;
    app.globalData.userInfo = userInfo;
    util.get_curl(baseurl + '/books/userLogin', { "code": app.globalData.code, 'userInfo': userInfo},function(res){
      var user = res.data.userInfo;
      var openid=JSON.parse(user).user_code;
      app.globalData.openid = openid;
      wx:wx.hideLoading();
      wx: wx.switchTab({
        url: '../../pages/index/index',
      })
     });

  },
  agreeGetUser: function (e) {
    // console.log(e.detail);
    try {
      wx: wx.setStorageSync('userInfo', e.detail.userInfo);
    } catch (e) {
      wx: wx.showToast({
        title: '系统提示，网络错误！',
        icon: 'warn',
        duration: 1500,
      })
    }
    wx.showLoading({
      title: '加载中...',
    });
    let that = this;
    that.setData({
      showModel: false
    });
    that.getOp(e.detail.userInfo);
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
   
  }
})