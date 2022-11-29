import { Failure } from "./Failure";

export interface RequestState<DataType = string> {
  data: DataType | null;
  loading: "idle" | "pending";
  failure: Failure | null;
}
