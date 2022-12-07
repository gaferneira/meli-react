export type Left<T> = { tag: "left"; value: T };
export type Right<T> = { tag: "right"; value: T };
export type Either<L, R> = Left<L> | Right<R>;

export const match = <T, L, R>(
  input: Either<L, R>,
  left: (left: L) => T,
  right: (right: R) => T
) => {
  switch (input.tag) {
    case "left":
      return left(input.value);
    case "right":
      return right(input.value);
  }
};

export const isRight = <L, R>(input: Either<L, R>): input is Right<R> => {
  return input.tag === "right";
};

export const isLeft = <L, R>(input: Either<L, R>): input is Left<L> => {
  return input.tag === "left";
};

export const Right = <T>(value: T): Right<T> => {
  return {
    tag: "right",
    value,
  };
};

export const Left = <T>(value: T): Left<T> => {
  return {
    tag: "left",
    value,
  };
};

export const rightOrDefault = <L, R>(input: Either<L, R>, D: R) => {
  return isRight(input) ? input.value : D;
};
