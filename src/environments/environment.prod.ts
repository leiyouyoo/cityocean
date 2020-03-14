// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`

export const environment = {
  MOCK_URL: `https://api.cityocean.com:20001`,
  SERVER_URL: `https://api.cityocean.com:20001`, // 远端服务器地址（必需的）
  SignalR_Url: `https://api.cityocean.com:20002`, // SignalR_SERVER_URL服务器地址（必需的）
  appDownloadUrl: `http://download.cityocean.com`,
  appBaseUrl: `https://localhost:8100/`, // APP 地址
  StoreUrl: 'https://api.cityocean.com:20001',
  uploadUrl: `https://api.cityocean.com:20001/Storage/File/Upload`,
  ImImageUrl: `https://api.cityocean.com:20001`,
  cityoceanId: 2,
  production: false,
  useHash: true,
  hmr: false,
};
