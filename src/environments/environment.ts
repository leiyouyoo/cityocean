// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`

// const baseApiUrl = `http://192.168.1.6:8000`;
// const signalRUrl = `http://192.168.1.6:8002`;
const baseApiUrl = `http://localhost:8100/api`;
const signalRUrl = `http://localhost:8100/api-signalR`;
export const environment = {
  MOCK_URL: baseApiUrl,
  SERVER_URL: baseApiUrl, // 远端服务器地址（必需的）
  SignalR_Url: signalRUrl, // SignalR_SERVER_URL服务器地址（必需的）
  appDownloadUrl: `http://download.cityocean.com`,
  appBaseUrl: `https://localhost:8100/`, // APP 地址
  StoreUrl: baseApiUrl,
  uploadUrl: `${baseApiUrl}/Storage/File/Upload`,
  ImImageUrl: baseApiUrl,
  cityoceanId: 2,
  production: false,
  useHash: true,
  hmr: false,
  SDKAppID:1400335203,   // 测试坏境账号
  SDK_SECRETKEY:'bb62d7cfb38f34a580d91071ac5216824c6e5bd782cd445556067a9ecf91ee03',
  // SDKAppID:1400333951, // 正式坏境账号
  // SDK_SECRETKEY:'c9960f5d79de860d8d4ba37cfd82fdafb7132f9d4810641825bed04b486d0912'
};
