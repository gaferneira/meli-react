import assert from "assert";
import { expect, describe, it, vi } from "vitest";
import { AxiosInstance, AxiosResponse } from "axios";
import { ProductRepositoryImpl } from "./../../../src/data";
import { isLeft, isRight } from "./../../../src/domain/utils/Either";

describe("ProductRepositoryImpl Test", () => {
  it("When the getProducts() method called - it works successfully", async () => {
    //GIVEN
    const axiosInstance: AxiosInstance = {
      get: vi.fn(),
    } as unknown as AxiosInstance;
    const productRepositoryImpl = new ProductRepositoryImpl(axiosInstance);
    const country = "co";
    const query = "query";
    const axiosResponse = createSuccessAxiosResponse({ results: [] });
    //WHEN
    axiosInstance.get.mockResolvedValue(axiosResponse);
    const response = await productRepositoryImpl.getProducts(country, query);
    //THEN
    expect(axiosInstance.get).toHaveBeenCalledTimes(1);
    assert(isRight(response));
  });

  it("When the getProducts() method called - it throws an error", async () => {
    //GIVEN
    const axiosInstance: AxiosInstance = {
      get: vi.fn(),
    } as unknown as AxiosInstance;
    const productRepositoryImpl = new ProductRepositoryImpl(axiosInstance);
    const country = "co";
    const query = "query";
    //WHEN
    axiosInstance.get.mockRejectedValue(
      new Error("Fail to connect to the server"),
    );
    const response = await productRepositoryImpl.getProducts(country, query);
    //THEN
    expect(axiosInstance.get).toHaveBeenCalledTimes(1);
    assert(isLeft(response));
  });

  it("When the getProduct() method called - it works successfully", async () => {
    //GIVEN
    const axiosInstance: AxiosInstance = {
      get: vi.fn(),
    } as unknown as AxiosInstance;
    const productRepositoryImpl = new ProductRepositoryImpl(axiosInstance);
    const productId = "2412";
    const axiosResponse = createSuccessAxiosResponse({});
    //WHEN
    axiosInstance.get.mockResolvedValue(axiosResponse);
    const response = await productRepositoryImpl.getProduct(productId);
    //THEN
    expect(axiosInstance.get).toHaveBeenCalledTimes(1);
    assert(isRight(response));
  });

  it("When the getProduct() method called - it throws an error", async () => {
    //GIVEN
    const axiosInstance: AxiosInstance = {
      get: vi.fn(),
    } as unknown as AxiosInstance;
    const productRepositoryImpl = new ProductRepositoryImpl(axiosInstance);
    const productId = "2412";
    //WHEN
    axiosInstance.get.mockRejectedValue(
      new Error("Fail to connect to the server"),
    );
    const response = await productRepositoryImpl.getProduct(productId);
    //THEN
    expect(axiosInstance.get).toHaveBeenCalledTimes(1);
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
