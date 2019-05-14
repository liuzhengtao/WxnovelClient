// pages/chaper/chaper.js
const util = require('../../utils/util.js')
const app = getApp()
const baseurl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     "scrollHeight":"",
     "bookname":app.globalData.bookname,
     "isdisplay":"none",
     "font_big":app.globalData.font_big
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var chaper_text=options.chaper_text;
    var chaper_id = options.chaper_id;
    var chaper_name = options.chaper_name;
    var b_id = options.b_id;
    app.globalData.b_id=b_id;
    app.globalData.chaper_id=chaper_id
    var book_name = options.b_name;
    if(book_name!=undefined){
      app.globalData.bookname=book_name;
    }
    if (chaper_text.indexOf(chaper_name)>=0){
        chaper_name = "";
    }
    if(options.cat_name!=undefined){
      that.setData({ "chaper_text": chaper_text, "chaper_id": app.globalData.chaper_id,"chaper_name":chaper_name, "cat_name": options.cat_name, "b_id": app.globalData.b_id, "scrollTop": '0', "bg": app.globalData.bg, "c": app.globalData.c, "font_big": app.globalData.font_big });
    }else{
      that.setData({ "chaper_text": chaper_text, "chaper_id": app.globalData.chaper_id, "chaper_name": chaper_name,"b_id": app.globalData.b_id, "scrollTop": '0', "bg": app.globalData.bg, "c": app.globalData.c, "font_big": app.globalData.font_big });
    }
    
    util.get_curl(baseurl + '/books/saveOrUpdateBookRack', { 'b_id': app.globalData.b_id, 'chaper_id': app.globalData.chaper_id, 'openid': app.globalData.openid }, function (res) {
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
    wx.setStorageSync('aShow', true);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function (e) {
    var h_bg=app.globalData.bg;
    var h_c = app.globalData.c;
    // console.log(h_bg+h_c);
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
  bindNextChaperTap:function(e){
    var that = this;
    var b_id = that.data.b_id;
    var chaper_id = (parseInt(that.data.chaper_id)+1).toString();
    util.get_curl(baseurl + '/books/get_chapers_with_id', { 'b_id': b_id, 'chaper_id': chaper_id }, function (res) {
      var chaper_name = res.data.chaper_name;
      var chaper_text = res.data.chaper_text;
      // that.setData({ "chaper_text": chaper_text, "b_id": b_id,"chaper_id":chaper_id});    
      if (chaper_text.indexOf(chaper_name) >= 0) {
         chaper_name = "";
      }
      var options = { "b_id": b_id, "chaper_id": chaper_id, "chaper_text": chaper_text, 'where': app.globalData.where,"chaper_name":chaper_name}
      util.get_curl(baseurl + '/books/get_max_chapter_id_with_book', { 'b_id': b_id}, function (params) {
        
        var max_chapter_id = params.data.max_chapter_id;
       if(max_chapter_id<chaper_id){
         wx:wx.showModal({
           title: '最后章节提示',
           content: '你已经阅读到最后一章了，请更换其他类似的书籍查看',
           success: function (res) {
             wx:wx.navigateTo({
               url: '../../pages/books/books?cat_name='+that.data.cat_name,
             })
           },
         });
       }else{
         that.onLoad(options);
       }
      });
      
    });
  },
  bindpreviousChaperTap: function (e) {
    var that = this;
    var b_id = that.data.b_id;
    var chaper_id = (parseInt(that.data.chaper_id) - 1).toString();
    util.get_curl(baseurl + '/books/get_chapers_with_id', { 'b_id': b_id, 'chaper_id': chaper_id }, function (res) {
      var chaper_name = res.data.chaper_name;
      var chaper_text = res.data.chaper_text;
      if (chaper_text.indexOf(chaper_name) >= 0) {
        chaper_name = "";
      }
      var options = { "b_id": b_id, "chaper_id": chaper_id, "chaper_text": chaper_text, 'where': app.globalData.where, "chaper_name":chaper_name}
      that.onLoad(options);
    });  
  },
  bindBookMenusTap:function(e){
    var that = this;
    var b_id = that.data.b_id;
    wx.navigateTo({
      url: '../../pages/bookmenus/bookmenus?b_id=' + b_id + '&b_name=' + app.globalData.bookname,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindcontent:function(){
    var that = this;
    that.setData({"isdisplay":"none"});
  },
  shezhi:function(){
    var that = this;
    that.setData({ "isdisplay": "block" });
  },
  bindblack:function(){
   var that = this;
    app.globalData.bg ="black";
    app.globalData.c ="white";
   that.setData({"bg":'black',"c":'white'});

  },
  bindpink: function () {
    var that = this;
    app.globalData.bg = "#FFFACD";
    app.globalData.c = "black";
    that.setData({ "bg": '#FFFACD', "c": 'black' });
  },
  bindgreen:function(){
    var that = this;
    app.globalData.bg = "#CD8500";
    app.globalData.c = "black";
    that.setData({ "bg": '#CD8500', "c": 'black' });
  },
  bindblue:function(){
    var that = this;
    app.globalData.bg = "#B2DFEE";
    app.globalData.c = "black";
    that.setData({ "bg": '#B2DFEE', "c": 'black' });
  },
  bindfeng:function(){
    var that = this;
    app.globalData.bg = "#FFE4E1";
    app.globalData.c = "black";
    that.setData({ "bg": '#FFE4E1', "c": 'black' });
  },
  bindJianHao:function(){
   var that = this;
    var font_big=parseInt(app.globalData.font_big)-1;
     app.globalData.font_big = font_big;
     that.setData({"font_big":font_big}); 
  },
  bindJiaHao: function () {
    var that = this;
    var font_big = parseInt(app.globalData.font_big) + 1;
    app.globalData.font_big = font_big;
    that.setData({ "font_big": font_big });
  }

})