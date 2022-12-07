import { Either, Failure } from "@/domain";

export type DataResult<T> = Either<Failure, T>;
