import { DataResult } from "../entities";

export interface SearchRepository {
  getLastSearch(): DataResult<string>;
  addLastSearch(searchStr: string): DataResult<string>;
  cleanSearch(): DataResult<void>;
}
