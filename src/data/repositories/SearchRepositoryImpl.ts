import { DataResult, Right } from "@/domain";
import { SearchRepository } from "@/domain/repositories/SearchRepository";
import { StorageTypes } from "../dto";
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from "../utils";

export const SearchRepositoryImpl: SearchRepository = {
  getLastSearch: (): DataResult<string> => {
    const result = getSessionStorage(StorageTypes.SEARCH)
      ? getSessionStorage(StorageTypes.SEARCH)
      : "";
    return Right(result);
  },
  addLastSearch: (searchStr: string): DataResult<string> => {
    setSessionStorage(StorageTypes.SEARCH, searchStr);
    return Right(searchStr);
  },
  cleanSearch: (): DataResult<void> => {
    return Right(removeSessionStorage(StorageTypes.SEARCH));
  },
};
