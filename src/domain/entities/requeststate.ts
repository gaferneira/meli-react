import { Failure } from './failure';

export interface RequestState<DataType = string> {
    data: DataType | null;
    loading: 'idle' | 'pending';
    failure: Failure | null;
  }