import { resStructure } from '@/types/request/index';

export interface TResUpload extends resStructure {
  data: Array<string>;
}
