export class AppConsts {
  /**
   * 租户名称占位符
   */
  static readonly tenancyNamePlaceHolderInUrl = '{TENANCY_NAME}';

  /**
   * 服务端地址
   */
  static remoteServiceBaseUrl: string;

  /**
   * 服务端地址
   */
  static remoteServiceBaseUrlFormat: string;

  /**
   * 当前应用地址
   */
  static appBaseUrl: string;

  /**
   * 如果在发布过程中使用，则返回 angular 的 base-href
   *
   */
  static appBaseHref: string;

  static recaptchaSiteKey: string;
  static subscriptionExpireNootifyDayCount: number;

  static localeMappings: any = [];

  static readonly userManagement = {
    defaultAdminUserName: 'admin',
  };

  static readonly authorization = {
    encrptedAuthTokenName: 'enc_auth_token',
  };
}
