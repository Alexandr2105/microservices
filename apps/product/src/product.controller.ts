import { Body, Controller } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductTable } from './tables/product.table';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ProductId,
  ProductInfo,
  UpdateProductById,
} from '../../common/proto-ts-files/product';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // async getAllProductsForCategory(
  // ): Promise<ProductTable[]> {
  //   return this.productService.getAllProductsForCategory();
  // }

  @GrpcMethod('ProductService', 'CreateProduct')
  async createProduct(@Body() body: ProductInfo): Promise<ProductTable> {
    return this.productService.createProduct(body);
  }

  @GrpcMethod('ProductService', 'GetProductById')
  async getProductById(@Body() body: ProductId): Promise<ProductTable> {
    console.log(body);
    return this.productService.getProduct(body);
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  async updateProduct(@Body() body: UpdateProductById) {
    await this.productService.updateProduct(body);
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  async deleteProduct(@Body() body: ProductId) {
    await this.productService.deleteProduct(body);
  }
}
