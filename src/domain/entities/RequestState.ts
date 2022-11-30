import { Failure } from "./Failure";

export interface RequestState<DataType = string> {
  data: DataType | null;
  loading: boolean;
  failure: Failure | null;
}
