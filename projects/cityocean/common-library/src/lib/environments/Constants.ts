export const Constants = {
  ENVIRONMENT: 'development',//app环境，开发时为development，正式发布时需求注掉或者改为production
  TIMEOUT_MILLS: 5000,
  WEB_SITE: 'http://wxt.cityocean.com:8890/',
  ICPAdapter: 'http://wxt.cityocean.com:8895/',
  corpid:'wwfa5cf6ff34bcf1d2',
  corpsecret: 'LBPHk3GYkum3PFvXc8HpjgqrsSKETzxWD4NjGjb2Kgo',
  agentid: '1000036',
  // LoginUser: { "userid": "78DE5A82-4A54-E511-B422-0026551CA878", "code": "obama", "nickname": "obama", "isEnglish": "false" }
  //  LoginUser: { "userid": "F052B4F4-A05A-E911-B0C1-F71612D60FDF", "code": "huangting", "nickname": "huangting", "isEnglish": "false" }
   LoginUser: { "userid": sessionStorage.getItem('userid'), "code": sessionStorage.getItem('code'), "nickname": sessionStorage.getItem('nickname'), "isEnglish": sessionStorage.getItem('isEnglish') }
}
export const ValidationInformation = {
  code: '',
  state: ''
}
