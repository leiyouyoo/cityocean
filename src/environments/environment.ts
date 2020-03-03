// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`
//appBaseUrl:`http://wechat.cityocean.com:8994` // APP 地址

// export const environment = {
//   MOCK_URL: `http://192.168.1.5:8000`,
//   SERVER_URL: `http://192.168.1.5:8000`, // 远端服务器地址（必需的）
//   //SERVER_URL: `http://csp.cityocean.com:20200`, // 远端服务器地址（必需的）

//   SignalR_Url: `http://192.168.1.5:8002`, // SignalR_SERVER_URL服务器地址（必需的）
//   //SignalR_Url: `http://csp.cityocean.com:20201`, // SignalR_SERVER_URL服务器地址（必需的）

//   appBaseUrl: `http://localhost:8100/`, // APP 地址
//   //appBaseUrl: `http://wechat.cityocean.com:8994`, // APP 地址
//   //appBaseUrl: `http://csp.cityocean.com`, // APP 地址
//   StoreUrl: 'http://192.168.1.5:8000',
//   uploadUrl: `http://192.168.1.5:8000/Storage/File/Upload`,

//   cityoceanId: 2,
//   production: false,
//   useHash: true,
//   hmr: false,
// };

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */

import 'zone.js/dist/zone-error';  //Included with Angular CLI.

export const environment = {
  // SERVER_URL: `http://csp.cityocean.com:20200`, // 远端服务器地址（必需的）
  // SignalR_Url: `http://csp.cityocean.com:20201`, // SignalR_SERVER_URL服务器地址（必需的）
  SERVER_URL: `http://112.95.173.231:8000`, // 远端服务器地址（必需的）
  SignalR_Url: `http://112.95.173.231:8002`, // SignalR_SERVER_URL服务器地址（必需的）

  //appBaseUrl: `http://wechat.cityocean.com:8994`, // APP 地址
  appBaseUrl: `http://wx2.cityocean.com:8970`, // APP 地址
  MOCK_URL: '',
  StoreUrl: 'http://192.168.1.5:8000',
  uploadUrl: `http://192.168.1.5:8000/Storage/File/Upload`,

  // activity cityoceanId
  cityoceanId: 2,

  production: true,
  useHash: true,
  hmr: false,
};
