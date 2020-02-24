/**
 *0 = Quote
 *1 = Booking
 *2 = Shipment
 *3 = Order
 * */
export enum BookingStatusType {
  /// <summary>
  /// 草稿
  /// </summary>
  ///[Description("草稿")]
  Draft = 0,

  /// <summary>
  /// 已申请取消
  /// </summary>
  ///[Description("已申请取消")]
  Cancelled = 1,

  /// <summary>
  /// 已提交预订舱
  /// </summary>
  ///[Description("已提交预订申请")]
  Submitted = 2,

  /// <summary>
  /// 已预订
  /// </summary>
  ///[Description("已预订")]
  Booked = 3,

  /// <summary>
  /// 已申请订舱，未关联到有效报价
  /// </summary>
  ///[Description("已申请订舱但未关联到有效报价")]
  WaitingForPricing = 4,

  /// <summary>
  /// 等待买家确认报价
  /// </summary>
  ///[Description("等待买家确认报价")]
  WaitingForBuyer = 5,

  /// <summary>
  /// 等待卖家确认价格（贸易条款是卖家付款）
  /// </summary>
  //////[Description("等待卖家确认价格（贸易条款是卖家付款）")]
  WaitingForSeller = 6,

  /// <summary>
  /// 业务员已确认取消
  /// </summary>
  //////[Description("业务员已确认取消")]
  ConfirmCancelled = 7,

  ///[Description("ICP 端已下载")]
  IcpDownloaded = 8,
}
