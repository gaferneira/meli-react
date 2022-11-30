import { Product } from "@/domain";

export interface ProductDto {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  tags: string[];
}

export const ProductDtoToEntity = (dto: ProductDto): Product => {
  return {
    id: dto.id,
    title: dto.title,
    price: dto.price,
    thumbnail: dto.thumbnail,
    tags: dto.tags,
  };
};
