import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class ProductTable extends Model<ProductTable> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  price: number;

  @Column({ allowNull: false })
  quantity: number;
}
