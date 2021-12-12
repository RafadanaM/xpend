import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Transactions from '../transactions/transactions.entity';
import Users from '../users/users.entity';

@Entity()
class Tasks {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public amount: number;

  @Column({ default: false })
  public isComplete: boolean;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;

  @ManyToOne(() => Users, (user: Users) => user.tasks)
  public user: Users;

  @OneToMany(() => Transactions, (transaction: Transactions) => transaction.task)
  public transactions: Transactions[];
}

export default Tasks;
