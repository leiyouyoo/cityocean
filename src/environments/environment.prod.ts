export const environment = {
  // SERVER_URL: `http://csp.cityocean.com:20200`, // 远端服务器地址（必需的）
  // SignalR_Url: `http://csp.cityocean.com:20201`, // SignalR_SERVER_URL服务器地址（必需的）
  SERVER_URL: `http://112.95.173.231:8000`, // 远端服务器地址（必需的）
  SignalR_Url: `http://112.95.173.231:8002`, // SignalR_SERVER_URL服务器地址（必需的）

  //appBaseUrl: `http://wechat.cityocean.com:8994`, // APP 地址
  appBaseUrl: `http://wx2.cityocean.com:8970`, // APP 地址
  MOCK_URL: '',
  StoreUrl: 'http://112.95.173.231:8000',
  uploadUrl: `http://192.168.1.5:8000/Storage/File/Upload`,
  ImImageUrl: `http://112.95.173.230:8002`,
  // activity cityoceanId
  cityoceanId: 2,

  production: true,
  useHash: true,
  hmr: false,
};
