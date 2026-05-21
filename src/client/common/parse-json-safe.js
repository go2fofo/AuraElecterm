/*
 * @Author: fofo
 * @Date: 2026-05-20 15:46:50
 * @LastEditTime: 2026-05-20 16:55:10
 * @LastEditors: fofo
 * @Description: 
 * @FilePath: /AuraElecterm/src/client/common/parse-json-safe.js
 */
/**
 * safe parse json
 */
export default str => {
  if (!str) {
    return str
  }
  try {
    return JSON.parse(str)
  } catch (e) {
    console.error('JSON.parse fails', e.stack)
    return str
  }
}
