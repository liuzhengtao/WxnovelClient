const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function get_curl(url, params, callback) {
  wx: wx.request({
    url: url,
    data: params,
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      callback(res);
    }
  })

}

function IsInArray(arr, val) {

  　　var testStr = ',' + arr.join(",") + ",";

  　　return testStr.indexOf("," + val + ",") != -1;

} 


module.exports = {
  formatTime: formatTime,
  get_curl:get_curl,
  IsInArray: IsInArray
}
