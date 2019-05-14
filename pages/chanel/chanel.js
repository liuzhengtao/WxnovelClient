//logs.js
const util = require('../../utils/util.js')
const app = getApp()
const baseurl = app.globalData.baseUrl;
Page({
  data: {
    logs: [],
    'chanel_list': [
      {"c_name":'123'},
      {"c_name":'456'}
    ],
    imgUrls: [
      ''
    ]
  },
  onLoad: function () {
    var that = this;
    wx:wx.getSystemInfo({
      success: function(res) {
        that.setData({
          "eight":res.windowHeight,
          "width":res.windowWidth
        });
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    util.get_curl(baseurl + '/books/show_channel', '', function (res) {
      that.setData({
        "chanel_list": res.data.list
      });
    });
  },
  chaneltap:function(e){
    var c_id = e.target.dataset.c_id;
    app.globalData.c_id = c_id;
    wx.navigateTo({
      url: '/pages/categores/categores',
    })
  },
})
