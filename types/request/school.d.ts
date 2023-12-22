import { resStructure } from '../request/index';
import { TSchool } from '../object/school';

export interface TResponceSchoolList extends resStructure {
  data: Array<TSchool>;
}
