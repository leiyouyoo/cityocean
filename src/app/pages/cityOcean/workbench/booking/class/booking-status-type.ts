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
  'Waiting for Confirm' = 1,

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
  'Waiting for Pricing' = 4,

  /// <summary>
  /// 等待买家确认报价
  /// </summary>
  ///[Description("等待买家确认报价")]
  'Waiting for Buyer' = 5,

  /// <summary>
  /// 等待卖家确认价格（贸易条款是卖家付款）
  /// </summary>
  //////[Description("等待卖家确认价格（贸易条款是卖家付款）")]
  'Waiting for Seller' = 6,

  /// <summary>
  /// 业务员已确认取消
  /// </summary>
  //////[Description("业务员已确认取消")]
  Cancelled = 7,
  "Shipping Cancelled" = 8,
  "Price Confirmed By Customer" = 9,
  "Shipping order is requested with the carrier." = 10,
  "Notified SO successfully with the customer." = 11,
}
