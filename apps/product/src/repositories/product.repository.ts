import { InjectModel } from '@nestjs/sequelize';
import { ProductTable } from '../tables/product.table';
import { UpdateProductById } from '../../../common/proto-ts-files/product';

export class ProductRepository {
  constructor(
    @InjectModel(ProductTable)
    private readonly productTable: typeof ProductTable,
  ) {}

  async createProduct(product: ProductTable): Promise<ProductTable> {
    return product.save();
  }

  async updateProduct(body: UpdateProductById) {
    await this.productTable.update(body, { where: { id: body.id } });
  }

  async deleteProduct(productId: string) {
    await this.productTable.destroy({ where: { id: productId } });
  }

  async getProduct(productId: string): Promise<ProductTable> {
    return this.productTable.findOne({ where: { id: productId } });
  }
}
