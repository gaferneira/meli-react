export interface SearchRepository {
  getLastSearch(): string;
  addLastSearch(searchStr: string): string;
  cleanSearch(): void;
}
