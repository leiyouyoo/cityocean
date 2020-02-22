import { MessageTypeEnum } from './type.enum';

export interface MessageEntity {
  id: string;
  fromID: string;
  toID: string;
  type: MessageTypeEnum;
  businessID: string;
  avatar: string;
  content: string;
}
