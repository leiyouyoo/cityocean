import { BillStatus } from './BillStatus';

export interface IGetAllBillingInput {
  status: BillStatus | null | undefined;
  sorting: string | null | undefined;
  startTime: Date | null | undefined;
  endTime: Date | null | undefined;
  maxResultCount: number | null | undefined;
  skipCount: number | null | undefined;
}

export class GetAllBillingInput implements IGetAllBillingInput {
  status: BillStatus | null | undefined;
  sorting: string | null | undefined;
  startTime: Date | null | undefined;
  endTime: Date | null | undefined;
  maxResultCount: number | null | undefined;
  skipCount: number | null | undefined;
  shipmentId?: number;
}


