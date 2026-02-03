/*
 * @Description: 
 * @Author: 星海
 * @Date: 2022-06-07 16:34:34
 * @LastEditors: 星海
 * @LastEditTime: 2022-07-13 09:24:26
 */
const BASE_URL = process.env.NODE_ENV === 'production'
  ? './'
  : '/'
module.exports = {
  publicPath: BASE_URL,
  outputDir:"docs",
  assetsDir:"",
  productionSourceMap:false,
}