//index.js
//获取应用实例
const util = require('../../utils/util.js');
const app = getApp();
const baseurl = app.globalData.baseUrl;

Page({
  data: {
    index_hearders:[],
    index_sections:[],
    imgUrls:[
      baseurl+"/upload/timg.jpg",
      baseurl + "/upload/timg3.jpg",
      baseurl + "/upload/timg2.jpg",
      baseurl +"/upload/timg4.jpg"
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    
  },
  onLoad: function () {
    var that = this;
    wx.setStorageSync('aShow', false);
    wx.showLoading({
      title: '加载中......',
    })
    util.get_curl(baseurl +'/books/get_recommend_books_with_user',{'openid':app.globalData.openid},function(res){
      // console.log(res);
     var  books_list = res.data.book;
     app.globalData.books_list=books_list;
      var index_hearders=[];
      var index_sections=[];
     for(var i=0;i<books_list.length;i++){
        if(i<=2){
          index_hearders.push(books_list[i]);
        }else{
          index_sections.push(books_list[i]);
        }
     }
     wx.hideLoading();
     console.log(index_hearders);
      that.setData({
        "index_hearders": index_hearders,
        "index_sections": index_sections
      });
    })
  },
  getUserInfo: function(e) {
  
  },
})
