export interface RegionDto {
  [key: string]: any;
  code: string;
  name: string;
  nameLocalization: string;
  isValid: boolean;
  parentId: string;
  children: RegionDto[];
  creatorUserName: string;
  creationTime: string;
  id: string;
}
