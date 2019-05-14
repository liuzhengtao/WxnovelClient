//logs.js
const util = require('../../utils/util.js')
const app = getApp()
const baseurl = app.globalData.baseUrl;
Page({
  data: {
    logs: [],
    bookurl: "../../pages/books/books"
  },
  onLoad: function () {
    var that = this;
    var c_id = app.globalData.c_id;
    util.get_curl(baseurl +'/books/show_categore?c_id='+c_id,'',function(res){
      that.setData({
        "categores_list":res.data.list});
      });
  }
})
