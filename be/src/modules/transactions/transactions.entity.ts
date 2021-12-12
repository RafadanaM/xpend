import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Tasks from '../tasks/tasks.entity';
import Users from '../users/users.entity';

@Entity()
class Transactions {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public amount: number;

  @Column()
  public date: Date;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;

  @ManyToOne(() => Users, (user: Users) => user.transactions)
  public user: Users;

  @ManyToOne(() => Tasks, (task: Tasks) => task.transactions, { nullable: true, onDelete: 'SET NULL' })
  public task?: Tasks;
}

export default Transactions;
