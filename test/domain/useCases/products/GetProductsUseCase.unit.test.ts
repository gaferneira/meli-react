import assert from "assert";
import { expect, describe, it, vi } from "vitest";
import {
  Right,
  isLeft,
  isRight,
  ProductRepository,
  GetProductsUseCase,
} from "./../../../../src/domain/";

describe("GetProductsUseCase Test", () => {
  it("When the getProductsUseCase called - it works successfully", async () => {
    //GIVEN
    const productRepository: ProductRepository = {
      getProducts: vi.fn(),
    };
    const getProductsUseCase = new GetProductsUseCase(productRepository);
    const country = "co";
    const query = "query";
    const repositoryResponse = Right([]);
    //WHEN
    productRepository.getProducts.mockResolvedValue(repositoryResponse);
    const response = await getProductsUseCase.invoke(country, query);
    //THEN
    expect(productRepository.getProducts).toHaveBeenCalledTimes(1);
    assert(isRight(response));
  });

  it("When the getProductsUseCase called - it throws an error", async () => {
    //GIVEN
    const productRepository: ProductRepository = {
      getProducts: vi.fn(),
    };
    const getProductsUseCase = new GetProductsUseCase(productRepository);
    const country = "co";
    const query = "query";
    //WHEN
    productRepository.getProducts.mockRejectedValue(
      new Error("Fail to connect to the server"),
    );
    const response = await getProductsUseCase.invoke(country, query);
    //THEN
    expect(productRepository.getProducts).toHaveBeenCalledTimes(1);
    assert(isLeft(response));
  });
});
