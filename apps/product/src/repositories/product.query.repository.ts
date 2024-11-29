import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductTable } from '../tables/product.table';

@Injectable()
export class ProductQueryRepository {
  constructor(
    @InjectModel(ProductTable)
    private readonly productTable: typeof ProductTable,
  ) {}

  async getProductById(productId: number): Promise<ProductTable> {
    return this.productTable.findOne({ where: { id: productId } });
  }

  async getAllProductsByCategoryId(categoryId: string) {
    // return this.productTable.findAll({ where: { categoryId: categoryId } });
  }
}
