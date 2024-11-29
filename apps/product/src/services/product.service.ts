import { Injectable } from '@nestjs/common';
import { ProductQueryRepository } from '../repositories/product.query.repository';
import { ProductTable } from '../tables/product.table';
import { ProductRepository } from '../repositories/product.repository';
import {
  ProductId,
  ProductInfo,
  UpdateProductById,
} from '../../../common/proto-ts-files/product';

@Injectable()
export class ProductService {
  constructor(
    private readonly productQueryRepository: ProductQueryRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async getAllProductsForCategory(categoryId: string) {
    return this.productQueryRepository.getAllProductsByCategoryId(categoryId);
  }

  async createProduct(body: ProductInfo): Promise<ProductTable> {
    const newProduct = ProductTable.build({
      name: body.name,
      description: body.description,
      price: body.price,
      quantity: body.quantity,
    });

    return this.productRepository.createProduct(newProduct);
  }

  async updateProduct(body: UpdateProductById) {
    await this.productRepository.updateProduct(body);
  }

  async deleteProduct(body: ProductId) {
    await this.productRepository.deleteProduct(body.id);
  }

  async getProduct(body: ProductId) {
    return this.productRepository.getProduct(body.id);
  }
}
