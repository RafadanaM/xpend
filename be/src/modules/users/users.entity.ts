import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Transactions from '../transactions/transactions.entity';

@Entity()
class Users {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public first_name: string;

  @Column()
  public last_name: string;

  @Column({ unique: true })
  public email: string;

  @Column({ select: false })
  public password: string;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;

  @OneToMany(() => Transactions, (transaction: Transactions) => transaction.user)
  public transactions: Transactions[];
}

export default Users;
