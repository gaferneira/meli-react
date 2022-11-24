import { Failure } from "@/Domain";

export interface RequestState<DataType = string> {
  data: DataType | null;
  loading: "idle" | "pending";
  failure: Failure | null;
}
