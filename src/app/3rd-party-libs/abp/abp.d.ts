/*tslint:disable:jsdoc-format*/
/*tslint:disable:no-namespace*/

/**
 * 定义全局的 abp 命名空间
 */
declare namespace abp {
  /**
   * 当前应用的地址
   */
  let appPath: string;

  /**
   * 页面加载时间
   */
  let pageLoadTime: Date;

  /**
   * 使用abp.apppath变量将给定路径转换为绝对路径。
   *
   * @param path 给定的部分地址
   * @returns abp.appPath 与 path 结合后的地址
   */
  function toAbsAppPath(path: string): string;

  /**
   * 多租户
   */
  namespace multiTenancy {
    /**
     * 用于表示租户的归属方
     *
     * @enum {number}
     */
    enum sides {
      /**
       * 表示租户方
       */
      TENANT = 1,

      /**
       * 表示主机方
       */
      HOST = 2,
    }

    /**
     * 表示租户方
     */
    let isEnabled: boolean;

    /**
     * //是否为主机用户忽略功能检查
     */
    let ignoreFeatureCheckForHostUsers: boolean;

    /**
     * 获取租户Id的Cookie名称
     */
    let tenantIdCookieName: string;

    /**
     * 设置租户Id到Cookie中
     * @param tenantId 租户Id
     */
    function setTenantIdCookie(tenantId?: number): void;

    /**
     * 获取租户Id
     * @returns 租户Id
     */
    function getTenantIdCookie(): number;
  }

  /**
   * 当前会话信息
   */
  namespace session {
    /**
     * 用于承载租户相关信息
     *
     * @interface ITenant
     */
    interface ITenant {
      /**
       * 当前租户Id，为空时表示主机方
       */
      readonly id?: number;

      /**
       * 租户显示名称
       */
      readonly name?: string;

      /**
       * 租户标识名称
       */
      readonly tenancyName?: string;

      /**
       * //租户自定义的公司logo
       */
      readonly logoId?: string;

      /**
       * //logo文件类型
       */
      readonly logoFileType?: string;

      /**
       * 创建时间
       */
      readonly creationTime?: string;

      /**
       * //当前模拟的租户Id
       */
      readonly impersonatorTenantId?: number;
    }

    /**
     * 用于承载用户信息
     *
     * @interface IUser
     */
    interface IUser {
      /**
       * 用户Id
       */
      readonly id: number;

      /**
       *  customerId
       *
       */
      readonly customerId?: string;

      /**
       * First Name
       *
       */
      readonly name?: string;

      /**
       * Last Name
       *
       */
      readonly surname?: string;

      /**
       * 用户名
       *
       */
      readonly userName?: string;

      /**
       * Email
       *
       */
      readonly emailAddress?: string;

      /**
       * 头像Id
       *
       */
      readonly profilePictureId?: string;

      /**
       * 角色组
       *
       */
      readonly roles?: string[];

      /**
       * 当前模拟用户Id
       *
       */
      readonly impersonatorUserId?: number;
    }

    /**
     * 用于承载平台信息
     *
     * @interface IPlatform
     */
    interface IPlatform {
      /**
       * 平台名称
       *
       */
      readonly name?: string;

      /**
       * 版本
       *
       */
      readonly version?: string;

      /**
       * 发布日期
       *
       */
      readonly releaseDate?: string;
    }
    /**
     * 当前用户信息
     */
    let user: IUser;

    /**
     * 当前租户信息
     */
    let tenant: ITenant;

    /**
     * 当前平台信息
     */
    let platform: IPlatform;

    /**
     * 当前租户归属方
     */
    let multiTenancySide: multiTenancy.sides;
  }

  /**
   * !本地化相关，用不到，可删
   */
  namespace localization {
    interface ILanguageInfo {
      name: string;

      displayName: string;

      icon: string;

      isDefault: boolean;

      isDisabled: boolean;
    }

    interface ILocalizationSource {
      name: string;

      type: string;
    }

    let languages: ILanguageInfo[];

    let currentLanguage: ILanguageInfo;

    let sources: ILocalizationSource[];

    let defaultSourceName: string;

    let values: { [key: string]: string };

    let abpWeb: (key: string) => string;

    function localize(key: string, sourceName: string): string;

    function getSource(sourceName: string): (key: string) => string;

    function isCurrentCulture(name: string): boolean;
  }

  /**
   * 授权相关
   */
  namespace auth {
    /**
     * 应用定义的全部权限
     */
    let allPermissions: { [name: string]: boolean };

    /**
     * 当前登录用户所具有的权限
     */
    let grantedPermissions: { [name: string]: boolean };

    /**
     * 判断当前用户是否具有指定名称的权限
     *
     * @param permissionName 指定名称的权限
     * @returns
     */
    function isGranted(permissionName: string): boolean;

    /**
     * 判断是否满足任意权限
     *
     * @param args
     * @returns
     */
    function isAnyGranted(...args: string[]): boolean;

    /**
     * 判断是否满足全部权限
     *
     * @param args
     * @returns
     */
    function areAllGranted(...args: string[]): boolean;

    /**
     * Token 存储的 Cookie 名称
     */
    let tokenCookieName: string;

    /**
     * 保存授权 AuthToken
     * @param authToken 待保存的 authToken 字符串
     * @param expireDate 可选的到期日期。如果未指定，则将在会话结束时删除 AuthToken。
     */
    function setToken(authToken: string, expireDate?: Date): void;

    /**
     * 获取 AuthToken
     *
     * @returns
     */
    function getToken(): string;

    /**
     * 清除 AuthToken
     *
     */
    function clearToken(): void;
  }

  /**
   * !功能相关，用不到，可删
   */
  namespace features {
    interface IFeature {
      value: string;
    }

    let allFeatures: { [name: string]: IFeature };

    function get(name: string): IFeature;

    function getValue(name: string): string;

    function isEnabled(name: string): boolean;
  }

  /**
   * 设置相关
   */
  namespace setting {
    /**
     * 当前用户所具有的相关设置项
     */
    let values: { [name: string]: string };

    /**
     * 获取设置值
     *
     * @param name 设置项名称
     * @returns string 类型的设置值
     */
    function get(name: string): string;

    /**
     * 获取设置值
     *
     * @param name 设置项名称
     * @returns boolean 类型的设置值
     */
    function getBoolean(name: string): boolean;

    /**
     * 获取设置值
     *
     * @param name 设置项名称
     * @returns number 类型的设置值
     */
    function getInt(name: string): number;

    /**
     * 表示设置的范围域。
     * 权重：User > Tenant > Application
     * @enum {number}
     */
    enum settingScopes {
      /**
       * 表示应用的默认设置
       */
      Application = 1,

      /**
       * 表示租户的默认设置
       */
      Tenant = 2,

      /**
       * 表示用于自定义的设置
       */
      User = 4,
    }
  }

  /**
   * 导航相关
   */
  namespace nav {
    /**
     * 用于承载菜单组信息
     *
     * @interface IMenu
     */
    interface IMenu {
      /**
       * 菜单标识名称
       *
       */
      name: string;

      /**
       * 菜单显示名称
       *
       */
      displayName?: string;

      /**
       * 菜单携带的自定义数据
       *
       */
      customData?: any;

      /**
       * 导航项集合
       *
       */
      items: IMenuItem[];
    }

    /**
     * 用于承载导航项信息
     *
     * @interface IMenuItem
     */
    interface IMenuItem {
      /**
       * 标识名称
       *
       */
      name: string;

      /**
       * 排序
       *
       */
      order: number;

      /**
       * 显示名称
       *
       */
      displayName?: string;

      /**
       * 图标
       *
       */
      icon?: string;

      /**
       * 导航地址
       *
       */
      url?: string;

      /**
       * 自定义数据
       *
       */
      customData?: any;

      /**
       * 子项集合
       *
       */
      items: IMenuItem[];
    }

    /**
     * 当前用户具有的菜单
     */
    let menus: { [name: string]: IMenu };
  }

  /**
   * 通知相关
   */
  namespace notifications {
    /**
     * 表示通知紧急度
     *
     * @enum {number}
     */
    enum severity {
      INFO,
      SUCCESS,
      WARN,
      ERROR,
      FATAL,
    }

    /**
     * 表示通知阅读状态
     *
     * @enum {number}
     */
    enum userNotificationState {
      UNREAD,
      READ,
    }

    /**
     * 用于表示通知携带的数据。
     * 我们可以扩展这个接口来定义内置的通知类型，比如 ILocalizableMessageNotificationData
     * @interface INotificationData
     */
    interface INotificationData {
      /**
       * 数据类型，根据此类型可以构建不同的通知表达形式
       */
      type: string;

      /**
       * 所携带的变量数据
       *
       */
      properties: any;
    }

    /**
     * 用于表示通知信息
     *
     * @interface INotification
     */
    interface INotification {
      /**
       * Id
       */
      id: string;

      /**
       * 通知名称
       */
      notificationName: string;

      /**
       * 通知紧急程度
       */
      severity: severity;

      /**
       * 关联是实体类型
       */
      entityType?: any;

      /**
       * 实体名称
       */
      entityTypeName?: string;

      /**
       * 实体Id
       */
      entityId?: any;

      /**
       * 通知数据
       */
      data: INotificationData;

      /**
       * 通知时间
       */
      creationTime: Date;
    }

    /**
     * 表示当前用户的通知
     *
     * @interface IUserNotification
     */
    interface IUserNotification {
      /**
       * Id
       *
       */
      id: string;

      /**
       * 用户Id
       *
       */
      userId: number;

      /**
       * 阅读状态
       *
       */
      state: userNotificationState;

      /**
       * 具体通知信息
       *
       */
      notification: INotification;
    }

    /**
     * 通知消息格式化器
     */
    let messageFormatters: any;

    /**
     * 转换 userNotificationState 枚举项为字符串
     *
     * @param userNotificationState
     * @returns
     */
    function getUserNotificationStateAsString(userNotificationState: userNotificationState): string;

    /**
     * 根据通知紧急程度构建通知方式
     *
     * @param severity
     * @returns
     */
    function getUiNotifyFuncBySeverity(severity: severity): (message: string, title?: string, options?: any) => void;

    /**
     * 获取格式化后的通知文本
     *
     * @param userNotification
     * @returns
     */
    function getFormattedMessageFromUserNotification(userNotification: IUserNotification): string;

    /**
     * 呈现用户通知
     *
     * @param userNotification
     * @param [options]
     */
    function showUiNotifyForUserNotification(userNotification: IUserNotification, options?: any): void;
  }

  /**
   * log 相关，只是为了方法使用 console
   */
  namespace log {
    enum levels {
      DEBUG,
      INFO,
      WARN,
      ERROR,
      FATAL,
    }

    let level: levels;

    function log(logObject?: any, logLevel?: levels): void;

    function debug(logObject?: any): void;

    function info(logObject?: any): void;

    function warn(logObject?: any): void;

    function error(logObject?: any): void;

    function fatal(logObject?: any): void;
  }

  /**
   * notify
   */
  namespace notify {
    /**
     * 弹出一个 info notify
     *
     * @param message
     * @param [title]
     * @param [options]
     */
    function info(message: string, title?: string, options?: any): void;

    /**
     * 弹出一个 success notify
     *
     * @param message
     * @param [title]
     * @param [options]
     */
    function success(message: string, title?: string, options?: any): void;

    /**
     * 弹出一个 warn notify
     *
     * @param message
     * @param [title]
     * @param [options]
     */
    function warn(message: string, title?: string, options?: any): void;

    /**
     * 弹出一个 error notify
     *
     * @param message
     * @param [title]
     * @param [options]
     */
    function error(message: string, title?: string, options?: any): void;
  }

  /**
   * 消息提示相关
   */
  namespace message {
    function info(message: string, title?: string, isHtml?: boolean, options?: any): any;

    function success(message: string, title?: string, isHtml?: boolean, options?: any): any;

    function warn(message: string, title?: string, isHtml?: boolean, options?: any): any;

    function error(message: string, title?: string, isHtml?: boolean, options?: any): any;

    function confirm(message: string, callback?: (result: boolean, options?: any) => void): any;

    function confirm(
      message: string,
      title?: string,
      callback?: (result: boolean) => void,
      isHtml?: boolean,
      options?: any,
    ): any;
  }

  namespace ui {
    function block(elm?: any): void;

    function unblock(elm?: any): void;

    function setBusy(elm?: any, optionsOrPromise?: any): void;

    function clearBusy(elm?: any): void;
  }

  /**
   * 事件总线
   */
  namespace event {
    /**
     * 事件订阅
     *
     * @param eventName
     * @param callback
     */
    function on(eventName: string, callback: (...args: any[]) => void): void;

    /**
     * 取消订阅
     *
     * @param eventName
     * @param callback
     */
    function off(eventName: string, callback: (...args: any[]) => void): void;

    /**
     * 触发
     *
     * @param eventName
     * @param args
     */
    function trigger(eventName: string, ...args: any[]): void;
  }

  /**
   * 表示一个 Name-Value 对象
   *
   * @interface INameValue
   */
  interface INameValue {
    name: string;
    value?: any;
  }

  /**
   * 一些常用工具方法
   */
  namespace utils {
    /**
     * 创建命名空间
     *
     * @param root
     * @param ns
     * @returns
     */
    function createNamespace(root: any, ns: string): any;

    /**
     * 查找替换
     *
     * @param str
     * @param search
     * @param replacement
     * @returns
     */
    function replaceAll(str: string, search: string, replacement: any): string;

    /**
     * 格式化字符串
     *
     * @param str
     * @param args
     * @returns
     */
    function formatString(str: string, ...args: any[]): string;

    /**
     * 转换成 PascalCase 形式
     *
     * @param str
     * @returns
     */
    function toPascalCase(str: string): string;

    /**
     * 转换成 CamelCase 形式
     *
     * @param str
     * @returns
     */
    function toCamelCase(str: string): string;

    /**
     * 截断字符串
     *
     * @param str
     * @param maxLength
     * @returns
     */
    function truncateString(str: string, maxLength: number): string;

    /**
     * 截断字符串并添加给定的后缀
     *
     * @param str
     * @param maxLength
     * @param [postfix]
     * @returns
     */
    function truncateStringWithPostfix(str: string, maxLength: number, postfix?: string): string;

    /**
     * 判断是否是个 Js 函数
     *
     * @param obj
     * @returns
     */
    function isFunction(obj: any): boolean;

    /**
     * 构建 Url QueryString
     *
     * @param parameterInfos
     * @param [includeQuestionMark]
     * @returns
     */
    function buildQueryString(parameterInfos: INameValue[], includeQuestionMark?: boolean): string;

    /**
     * Sets a cookie value for given key.
     * This is a simple implementation created to be used by ABP.
     * Please use a complete cookie library if you need.
     * @param {string} key
     * @param {string} value
     * @param {Date} expireDate (optional). If not specified the cookie will expire at the end of session.
     * @param {string} path (optional)
     */
    function setCookieValue(key: string, value: string, expireDate?: Date, path?: string): void;

    /**
     * Gets a cookie with given key.
     * This is a simple implementation created to be used by ABP.
     * Please use a complete cookie library if you need.
     * @param {string} key
     * @returns {string} Cookie value or null
     */
    function getCookieValue(key: string): string;

    /**
     * Deletes cookie for given key.
     * This is a simple implementation created to be used by ABP.
     * Please use a complete cookie library if you need.
     * @param {string} key
     * @param {string} path (optional)
     */
    function deleteCookie(key: string, path?: string): void;
  }

  /**
   * 时间相关
   */
  namespace timing {
    /**
     * 表示时钟提供器
     *
     * @interface IClockProvider
     */
    interface IClockProvider {
      /**
       * 是否支持多时区
       *
       */
      supportsMultipleTimezone: boolean;

      /**
       * 当前时间
       *
       * @returns
       */
      now(): Date;

      /**
       * 标准化时间
       *
       * @param date
       * @returns
       */
      normalize(date: Date): Date;
    }

    /**
     * 表示时区信息
     *
     * @interface ITimeZoneInfo
     */
    interface ITimeZoneInfo {
      /**
       * 服务器时区信息
       *
       */
      windows: {
        timeZoneId: string;

        baseUtcOffsetInMilliseconds: number;

        currentUtcOffsetInMilliseconds: number;

        isDaylightSavingTimeNow: boolean;
      };

      /**
       * IANA
       *
       */
      iana: {
        timeZoneId: string;
      };
    }

    /**
     * UTC 时钟提供器
     */
    const utcClockProvider: IClockProvider;

    /**
     * 本地时钟提供器
     */
    const localClockProvider: IClockProvider;

    /**
     * 未指定时钟提供器
     */
    const unspecifiedClockProvider: IClockProvider;

    /**
     * 转换成当前用户的时区
     *
     * @param date
     * @returns
     */
    function convertToUserTimezone(date: Date): Date;

    /**
     * 当前时区信息
     */
    let timeZoneInfo: ITimeZoneInfo;
  }

  /**
   * 时钟相关
   */
  namespace clock {
    /**
     * 当前时钟提供器
     */
    let provider: timing.IClockProvider;

    /**
     * 当前时间
     *
     * @returns
     */
    function now(): Date;

    /**
     * 标准化时间
     *
     * @param date
     * @returns
     */
    function normalize(date: Date): Date;
  }

  /**
   * 安全相关
   */
  namespace security {
    /**
     * 防伪
     */
    namespace antiForgery {
      /**
       * 防伪Token的Cookie名称
       */
      let tokenCookieName: string;

      /**
       * 防伪Token的Header名称
       */
      let tokenHeaderName: string;

      /**
       * 获取防伪Token
       *
       * @returns
       */
      function getToken(): string;
    }
  }
}
