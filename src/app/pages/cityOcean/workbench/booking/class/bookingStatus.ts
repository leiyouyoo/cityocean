export enum bookingStatus {
  BookingDraft = 0,
  WaitingForCancelling = 1,
  BookingSubmitted = 2,
  ShippingDone = 3,
  WaitingForPricing = 4,
  WaitingForBuyer = 5,
  WaitingForSeller = 6,
  BookingCancelled = 7,
  ShippingCancelled = 8,
  PriceConfirmedByCustomer = 9,
  ShippingSubmittedToCarrier = 10,
  SoNumberNotifiedToCustomer = 11,
}
