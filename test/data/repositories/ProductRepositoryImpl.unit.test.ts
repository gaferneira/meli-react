import assert from "assert";
import { AxiosInstance, AxiosResponse } from "axios";
import { anything, instance, mock, verify, when } from "ts-mockito";
import { ProductRepositoryImpl } from "./../../../src/data";
import { isLeft, isRight } from "./../../../src/domain/utils/Either";

describe("ProductRepositoryImpl Test", () => {
  it("When the getProducts() method called - it works successfully", async () => {
    //GIVEN
    const axiosInstance: AxiosInstance = mock();
    const productRepositoryImpl = new ProductRepositoryImpl(
      instance(axiosInstance)
    );
    const country = "co";
    const query = "query";
    const axiosResponse = createSuccessAxiosResponse({ results: [] });
    //WHEN
    when(axiosInstance.get(anything(), anything())).thenReturn(
      Promise.resolve(axiosResponse)
    );
    const response = await productRepositoryImpl.getProducts(country, query);
    //THEN
    verify(axiosInstance.get(anything(), anything())).once();
    assert(isRight(response));
  });

  it("When the getProducts() method called - it throws an error", async () => {
    //GIVEN
    const axiosInstance: AxiosInstance = mock();
    const productRepositoryImpl = new ProductRepositoryImpl(
      instance(axiosInstance)
    );
    const country = "co";
    const query = "query";
    //WHEN
    when(axiosInstance.get(anything(), anything())).thenThrow(
      new Error("Fail to connect to the server")
    );
    const response = await productRepositoryImpl.getProducts(country, query);
    //THEN
    verify(axiosInstance.get(anything(), anything())).once();
    assert(isLeft(response));
  });

  it("When the getProduct() method called - it works successfully", async () => {
    //GIVEN
    const axiosInstance: AxiosInstance = mock();
    const productRepositoryImpl = new ProductRepositoryImpl(
      instance(axiosInstance)
    );
    const productId = "2412";
    const axiosResponse = createSuccessAxiosResponse({});
    //WHEN
    when(axiosInstance.get(anything())).thenReturn(
      Promise.resolve(axiosResponse)
    );
    const response = await productRepositoryImpl.getProduct(productId);
    //THEN
    verify(axiosInstance.get(anything())).once();
    assert(isRight(response));
  });

  it("When the getProduct() method called - it throws an error", async () => {
    //GIVEN
    const axiosInstance: AxiosInstance = mock();
    const productRepositoryImpl = new ProductRepositoryImpl(
      instance(axiosInstance)
    );
    const productId = "2412";
    //WHEN
    when(axiosInstance.get(anything())).thenThrow(
      new Error("Fail to connect to the server")
    );
    const response = await productRepositoryImpl.getProduct(productId);
    //THEN
    verify(axiosInstance.get(anything())).once();
    assert(isLeft(response));
  });
});

const createSuccessAxiosResponse = (data: any) => {
  const axiosResponse: AxiosResponse = {
    data,
    status: 200,
    statusText: "OK",
    config: {},
    headers: {},
  };
  return axiosResponse;
};
