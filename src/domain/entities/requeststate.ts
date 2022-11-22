import { Failure } from './failure';

export interface RequestState<DataType = string> {
    data: DataType;
    loading: 'idle' | 'pending';
    error: Failure | null;
  }