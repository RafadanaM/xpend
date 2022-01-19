import Users from '../../users/users.entity';
import Tasks from '../tasks.entity';
import * as typeorm from 'typeorm';
import Transactions from '../../transactions/transactions.entity';
import TasksService from '../tasks.service';
import taskDto from '../task.dto';
import NotFoundException from '../../../exceptions/NotFoundException';

const user: Users = {
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  email: 'email@email.com',
  password: 'testpassword123',
  created: new Date(),
  updated: new Date(),
  transactions: [],
  tasks: [],
};

const transaction: Transactions = {
  id: 1,
  title: 'title1',
  description: 'description1',
  amount: 1000,
  date: new Date(),
  created: new Date(),
  updated: new Date(),
  user: user,
};

let taskData: Tasks;
let createTaskData: taskDto;
beforeEach(() => {
  taskData = {
    id: 1,
    title: 'title1',
    description: 'description1',
    amount: 1000,
    created: new Date(),
    updated: new Date(),
    user: user,
    isComplete: true,
    transactions: [
      {
        id: 1,
        title: 'title1',
        description: 'description1',
        amount: 1000,
        date: new Date(),
        created: new Date(),
        updated: new Date(),
        user: user,
      },
    ],
  };
  createTaskData = {
    title: 'title1',
    description: 'description1',
    amount: 1000,
  };
});
jest.mock('typeorm', () => ({
  PrimaryGeneratedColumn: jest.fn(),
  Column: jest.fn(),
  CreateDateColumn: jest.fn(),
  UpdateDateColumn: jest.fn(),
  Entity: jest.fn(),
  ManyToOne: jest.fn(),
  OneToMany: jest.fn(),
  getRepository: jest.fn(),
}));

describe('The TasksService', () => {
  describe('when create task', () => {
    it('should return created task', async () => {
      jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
        const original = jest.requireActual('typeorm');
        return {
          ...original,
          create: jest.fn().mockResolvedValueOnce(taskData),
          save: jest.fn(),
        };
      });
      const tasksService = new TasksService();
      await expect(tasksService.createTask(createTaskData, user)).resolves.toBe(taskData);
    });
  });
  describe('when getting task by userId', () => {
    it('should return tasks by user id', async () => {
      const secondTask: Tasks = { ...taskData, id: 2, isComplete: false };
      jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
        const original = jest.requireActual('typeorm');
        return {
          ...original,
          find: jest.fn().mockResolvedValueOnce([taskData, secondTask] as Tasks[]),
          findOne: jest.fn().mockResolvedValueOnce(transaction).mockResolvedValue(undefined),
        };
      });

      const tasksService = new TasksService();
      await expect(tasksService.getTasksByUserId(user)).resolves.toStrictEqual([
        taskData,
        { ...secondTask, transactions: [] },
      ] as Tasks[]);
    });
  });

  describe('when deleting task', () => {
    describe('if task is not found', () => {
      it('should throw NotFoundException', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOne: jest.fn().mockResolvedValueOnce(undefined),
          };
        });
        const tasksService = new TasksService();
        await expect(tasksService.deleteTask(taskData.id, user)).rejects.toMatchObject(new NotFoundException());
      });
    });

    describe('if task is found', () => {
      it('should return deleted task', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOne: jest.fn().mockResolvedValueOnce(taskData),
            delete: jest.fn(),
          };
        });
        const tasksService = new TasksService();
        await expect(tasksService.deleteTask(taskData.id, user)).resolves.toBe(taskData);
      });
    });
  });
});
