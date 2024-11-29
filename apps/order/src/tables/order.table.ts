import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class OrderTable extends Model<OrderTable> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ allowNull: false })
  productId: string;

  @Column({ allowNull: false })
  quantity: number;

  @Column({ allowNull: false })
  price: number;

  @Column({ allowNull: false })
  userId: string;
}
