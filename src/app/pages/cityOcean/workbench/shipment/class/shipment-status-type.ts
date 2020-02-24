/**
 *0 = Quote
 *1 = Booking
 *2 = Shipment
 *3 = Order
 * */
export enum ShipmentStatusType {
  /// <summary>
  /// 需要用拖车，货在工厂未开始运输
  /// </summary>
  ///[Description("需要用拖车，货在工厂未开始运输")]
  'Seller Location' = 0,

  /// <summary>
  /// 港前拖车发车
  /// </summary>
  ///[Description("港前拖车发车")]
  'OriginStopOff' = 1,

  /// <summary>
  /// 拖车接到货，在运往起运港途中
  /// </summary>
  ///[Description("拖车接到货，在运往起运港途中")]
  'In Transit To Departure port' = 2,

  /// <summary>
  /// 货物从到达起运港一直到离开之前
  /// </summary>
  ///[Description("货物从到达起运港一直到离开之前")]
  'Departure Port' = 3,

  /// <summary>
  /// 货物从起运港出发，运往目的港
  /// </summary>
  ///[Description("货物从起运港出发，运往目的港")]
  'In Transit To Arrival Port' = 4,

  /// <summary>
  /// 货物到达目的港
  /// </summary>
  ///[Description("货物到达目的港")]
  'Arrival Port' = 5,

  /// <summary>
  /// 拖车
  /// </summary>
  ///[Description("拖车")]
  'In Transit To Final Destination' = 6,

  /// <summary>
  /// 港后拖车发车
  /// </summary>
  ///[Description("港后拖车发车")]
  'DestinationStopOff' = 7,

  /// <summary>
  /// 最终目的地
  /// </summary>
  ///[Description("最终目的地")]
  'Final Destination' = 8,

  /// <summary>
  /// 已取消
  /// </summary>
  ///[Description("已取消")]
  'Canceled' = 9,

  /// <summary>
  /// 已完成
  /// </summary>
  ///[Description("已完成")]
  'Completed' = 10
}
