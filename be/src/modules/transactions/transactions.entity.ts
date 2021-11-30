import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Users from '../users/users.entity';

@Entity()
class Transactions {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public description: string;

  @Column()
  public amount: number;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;

  @ManyToOne(() => Users, (user: Users) => user.transactions)
  public user: Users;
}

export default Transactions;