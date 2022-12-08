import { DataResult, Right } from "@/domain";
import { SearchRepository } from "@/domain/repositories/SearchRepository";
import { StorageTypes } from "../dto";
import { LocalStorage } from "../local";

export class SearchRepositoryImpl implements SearchRepository {
  constructor(private readonly localStorage: LocalStorage) {}
  getLastSearch(): DataResult<string> {
    const result = this.localStorage.getItem(StorageTypes.SEARCH)
      ? this.localStorage.getItem(StorageTypes.SEARCH)
      : "";
    return Right(result);
  }
  addLastSearch(searchStr: string): DataResult<string> {
    this.localStorage.setItem(StorageTypes.SEARCH, searchStr);
    return Right(searchStr);
  }
  cleanSearch(): DataResult<void> {
    return Right(this.localStorage.removeItem(StorageTypes.SEARCH));
  }
}
