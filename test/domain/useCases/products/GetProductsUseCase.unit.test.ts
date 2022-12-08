import assert from "assert";
import { anything, instance, mock, verify, when } from "ts-mockito";
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
    const productRepository: ProductRepository = mock();
    const getProductsUseCase = new GetProductsUseCase(
      instance(productRepository)
    );
    const country = "co";
    const query = "query";
    const repositoryResponse = Right([]);
    //WHEN
    when(productRepository.getProducts(country, query)).thenReturn(
      Promise.resolve(repositoryResponse)
    );
    const response = await getProductsUseCase.invoke(country, query);
    //THEN
    verify(productRepository.getProducts(anything(), anything())).once();
    assert(isRight(response));
  });

  it("When the getProductsUseCase called - it throws an error", async () => {
    //GIVEN
    const productRepository: ProductRepository = mock();
    const getProductsUseCase = new GetProductsUseCase(
      instance(productRepository)
    );
    const country = "co";
    const query = "query";
    //WHEN
    when(productRepository.getProducts(country, query)).thenThrow(
      new Error("Fail to connect to the server")
    );
    const response = await getProductsUseCase.invoke(country, query);
    //THEN
    verify(productRepository.getProducts(anything(), anything())).once();
    assert(isLeft(response));
  });
});
