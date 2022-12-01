import { SearchRepository } from "@/domain/repositories/SearchRepository";
import { StorageTypes } from "../dto";
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from "../utils";

export const SearchRepositoryImpl: SearchRepository = {
  getLastSearch: (): string => {
    return getSessionStorage(StorageTypes.SEARCH)
      ? getSessionStorage(StorageTypes.SEARCH)
      : "";
  },
  addLastSearch: (searchStr: string): string => {
    setSessionStorage(StorageTypes.SEARCH, searchStr);
    return searchStr;
  },
  cleanSearch: (): void => {
    removeSessionStorage(StorageTypes.SEARCH);
  },
};
