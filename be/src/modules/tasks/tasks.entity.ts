import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Tasks;
