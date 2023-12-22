import { resStructure } from '@/types/request/index';
import { TAccount } from '@/types/object/account';

export interface TResAccountDetail extends resStructure {
  data: TAccount;
}
