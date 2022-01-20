import Users from '../../users/users.entity';
import Tasks from '../tasks.entity';
import * as typeorm from 'typeorm';
import Transactions from '../../transactions/transactions.entity';
import TasksService from '../tasks.service';
import taskDto from '../task.dto';
import NotFoundException from '../../../exceptions/NotFoundException';
import createTransactionDto from '../../transactions/transactions.dto';
import ForbiddenException from '../../../exceptions/ForbiddenException';
import BadRequestException from '../../../exceptions/BadRequestException';

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

const createTransactionData: createTransactionDto = {
  title: 'title1',
  description: 'description1',
  amount: 1000,
  date: new Date(),
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

  describe('When editing a task', () => {
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
        await expect(tasksService.editTask(taskData.id, createTaskData, user)).rejects.toMatchObject(
          new NotFoundException()
        );
      });
    });

    describe('if task is found', () => {
      it('should return edited task', async () => {
        const editedTaskData: taskDto = { ...createTaskData, title: 'title2' };
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOne: jest.fn().mockResolvedValueOnce(editedTaskData),
            update: jest.fn(),
          };
        });
        const tasksService = new TasksService();
        await expect(tasksService.editTask(taskData.id, editedTaskData, user)).resolves.toStrictEqual(editedTaskData);
      });
    });
  });

  describe('when completing task', () => {
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
        await expect(tasksService.completeTask(taskData.id, user, createTransactionData)).rejects.toMatchObject(
          new NotFoundException()
        );
      });
    });

    describe('if task is found', () => {
      describe('if task is not owned by user', () => {
        it('should throw Forbidden Exception', async () => {
          jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
            const original = jest.requireActual('typeorm');
            return {
              ...original,
              findOne: jest.fn().mockResolvedValueOnce(taskData),
            };
          });

          const tasksService = new TasksService();
          await expect(
            tasksService.completeTask(taskData.id, { ...user, id: 2 }, createTransactionData)
          ).rejects.toMatchObject(new ForbiddenException());
        });
      });
      describe('if task is complete', () => {
        it('should throw BadRequest exception', async () => {
          jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
            const original = jest.requireActual('typeorm');
            return {
              ...original,
              findOne: jest.fn().mockResolvedValueOnce(taskData),
            };
          });
          const tasksService = new TasksService();
          await expect(tasksService.completeTask(taskData.id, user, createTransactionData)).rejects.toMatchObject(
            new BadRequestException('Task is already complete')
          );
        });
      });

      describe('if task is not complete', () => {
        it('should return updated task and new transaction', async () => {
          jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
            const original = jest.requireActual('typeorm');
            return {
              ...original,
              findOne: jest.fn().mockResolvedValueOnce({ ...taskData, isComplete: false } as Tasks),
              create: jest.fn().mockResolvedValueOnce(transaction),
              save: jest.fn().mockResolvedValueOnce(transaction),
              update: jest.fn(),
            };
          });
          const tasksService = new TasksService();
          await expect(tasksService.completeTask(taskData.id, user, createTransactionData)).resolves.toStrictEqual({
            task: { ...taskData, isComplete: true },
            transaction: transaction,
          });
        });
      });
    });
  });

  describe('when undo task', () => {
    describe('if task does not exist', () => {
      it('should throw NotFoundException', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOne: jest.fn().mockResolvedValueOnce(undefined),
          };
        });
        const tasksService = new TasksService();
        await expect(tasksService.undoTask(taskData.id, user)).rejects.toMatchObject(new NotFoundException());
      });
    });

    describe('if task exist', () => {
      describe('if task is not complete', () => {
        it('should throw BadRequestException', async () => {
          jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
            const original = jest.requireActual('typeorm');
            return {
              ...original,
              findOne: jest.fn().mockResolvedValueOnce({ ...taskData, isComplete: false } as Tasks),
            };
          });
          const tasksService = new TasksService();
          await expect(tasksService.undoTask(taskData.id, user)).rejects.toMatchObject(
            new BadRequestException('Task is already incomplete')
          );
        });
      });
      describe('if task is complete', () => {
        describe('if transaction exist', () => {
          describe('if transaction created year & month is equal to task updated year & month', () => {
            it('should throw return transaction and task', async () => {
              jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
                const original = jest.requireActual('typeorm');
                return {
                  ...original,
                  findOne: jest.fn().mockResolvedValueOnce(taskData).mockResolvedValueOnce(transaction),
                  delete: jest.fn(),
                  update: jest.fn(),
                };
              });

              const tasksService = new TasksService();
              await expect(tasksService.undoTask(taskData.id, user)).resolves.toStrictEqual({
                task: { ...taskData, isComplete: false },
                transaction: taskData,
              });
            });
          });

          describe('if transaction created year & month is not equal to task updated year & month', () => {
            it('transaction should be null', async () => {
              jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
                const original = jest.requireActual('typeorm');
                return {
                  ...original,
                  findOne: jest
                    .fn()
                    .mockResolvedValueOnce({ ...taskData, updated: new Date(2020, 11, 17) })
                    .mockResolvedValueOnce(transaction),
                  delete: jest.fn(),
                  update: jest.fn(),
                };
              });

              const tasksService = new TasksService();
              await expect(tasksService.undoTask(taskData.id, user)).resolves.toStrictEqual({
                task: { ...taskData, updated: new Date(2020, 11, 17), isComplete: false },
                transaction: undefined,
              });
            });
          });
        });
      });
    });
  });
});
