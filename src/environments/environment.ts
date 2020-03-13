// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`

export const environment = {
  MOCK_URL: `http://api.cityocean.com:20001`,
  SERVER_URL: `http://api.cityocean.com:20001`, // 远端服务器地址（必需的）
  SignalR_Url: `http://192.168.1.6:8002`, // SignalR_SERVER_URL服务器地址（必需的）
  appBaseUrl: `http://localhost:8100/`, // APP 地址
  StoreUrl: 'http://api.cityocean.com:20001',
  uploadUrl: `http://api.cityocean.com:20001/Storage/File/Upload`,
  ImImageUrl: `http://api.cityocean.com:20001`,
  cityoceanId: 2,
  production: false,
  useHash: true,
  hmr: false,
};
