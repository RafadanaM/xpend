import Users from '../../users/users.entity';
import createTransactionDto from '../transactions.dto';
import Transactions from '../transactions.entity';
import * as typeorm from 'typeorm';
import TransactionsService from '../transactions.service';
import NotFoundException from '../../../exceptions/NotFoundException';
import ForbiddenException from '../../../exceptions/ForbiddenException';
import { EditTransactionResponse } from '../../../interfaces/response.interface';
import Tasks from '../../tasks/tasks.entity';

let createTransactionData: createTransactionDto;
let transactionData: Transactions;
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
const task: Tasks = {
  id: 1,
  title: 'title',
  description: 'description',
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

const editTransactionData: createTransactionDto = {
  title: 'title2',
  description: 'description1',
  amount: 1000,
  date: new Date(),
};

beforeEach(() => {
  createTransactionData = {
    title: 'title1',
    description: 'description1',
    amount: 1000,
    date: new Date(),
  };

  transactionData = {
    id: 1,
    title: 'title1',
    description: 'description1',
    amount: 1000,
    date: new Date(),
    created: new Date(),
    updated: new Date(),
    user: user,
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
  Between: jest.fn(),
  getRepository: jest.fn(),
  ILike: jest.fn(),
}));

describe('The TransactionsService', () => {
  describe('When creating a new transaction', () => {
    it('should create a new transaction', async () => {
      jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
        const original = jest.requireActual('typeorm');
        return {
          ...original,
          create: jest.fn().mockResolvedValueOnce(transactionData),
          save: jest.fn().mockResolvedValueOnce(transactionData),
        };
      });
      const transactionsService = new TransactionsService();
      await expect(transactionsService.createTransaction(createTransactionData, user)).resolves.toBe(transactionData);
    });
  });

  describe('When getting current month transaction', () => {
    it('should return totalTransactions, gained, and spent', async () => {
      jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
        const original = jest.requireActual('typeorm');

        return {
          ...original,
          find: jest.fn().mockResolvedValueOnce([{ ...transactionData }, { ...transactionData, id: 2, amount: -1000 }]),
        };
      });

      const transactionsService = new TransactionsService();
      await expect(transactionsService.getThisMonthTransactions(-420, user)).resolves.toStrictEqual({
        gained: 1000,
        spent: 1000,
        totalTransactions: 2,
      });
    });
  });

  describe('When getting transactions by user', () => {
    describe('if name and date is empty', () => {
      it('should return all transactions by user', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            find: jest.fn().mockResolvedValueOnce([{ ...transactionData }]),
          };
        });

        const transactionsService = new TransactionsService();
        await expect(transactionsService.getTransactionsByUser(user, '', '')).resolves.toStrictEqual([
          { ...transactionData },
        ]);
      });
    });

    describe('if name is not empty and date is empty', () => {
      it('should return all transactions by user based on name', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            find: jest.fn().mockResolvedValueOnce([{ ...transactionData }]),
          };
        });

        const transactionsService = new TransactionsService();
        await expect(transactionsService.getTransactionsByUser(user, 'title', '')).resolves.toStrictEqual([
          { ...transactionData },
        ]);
      });
    });

    describe('if date is not empty and name is empty', () => {
      it('should return all transactions by user based on date', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            find: jest.fn().mockResolvedValueOnce([{ ...transactionData }]),
          };
        });

        const transactionsService = new TransactionsService();
        await expect(transactionsService.getTransactionsByUser(user, '', '2018-11-11')).resolves.toStrictEqual([
          { ...transactionData },
        ]);
      });
    });

    describe('if name and date is not empty', () => {
      it('should return all transactions by user based on date and name', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            find: jest.fn().mockResolvedValueOnce([{ ...transactionData }]),
          };
        });

        const transactionsService = new TransactionsService();
        await expect(transactionsService.getTransactionsByUser(user, 'title', '2018-11-11')).resolves.toStrictEqual([
          { ...transactionData },
        ]);
      });
    });
  });

  describe('When edit transaction', () => {
    describe('if transaction does not exists', () => {
      it('should throw NotFoundException', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOne: jest.fn().mockResolvedValueOnce(undefined),
          };
        });
        const transactionsService = new TransactionsService();
        await expect(transactionsService.editTransaction(2, editTransactionData, user)).rejects.toMatchObject(
          new NotFoundException()
        );
      });
    });
    describe('if transaction exist', () => {
      describe('if transaction is not owned by user', () => {
        it('should throw ForbiddenException', async () => {
          jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
            const original = jest.requireActual('typeorm');
            return {
              ...original,
              findOne: jest.fn().mockResolvedValueOnce(transactionData),
            };
          });
          const transactionsService = new TransactionsService();
          await expect(
            transactionsService.editTransaction(transactionData.id, editTransactionData, { ...user, id: 2 })
          ).rejects.toMatchObject(new ForbiddenException());
        });
      });

      describe('if transaction is owned by user', () => {
        it('should return prev transaction and updated transaction', async () => {
          jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
            const original = jest.requireActual('typeorm');
            return {
              ...original,
              findOne: jest.fn().mockResolvedValueOnce(transactionData),
              update: jest.fn().mockResolvedValueOnce({ ...transactionData, ...editTransactionData }),
            };
          });

          const transactionsService = new TransactionsService();
          await expect(
            transactionsService.editTransaction(transactionData.id, editTransactionData, user)
          ).resolves.toStrictEqual({
            prevTransaction: transactionData,
            updatedTransaction: { ...transactionData, ...editTransactionData },
          } as EditTransactionResponse);
        });
      });
    });
  });

  describe('When deleting transaction', () => {
    describe('if transaction does not exist', () => {
      it('should throw NotFoundException', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOne: jest.fn().mockResolvedValueOnce(undefined),
          };
        });
        const transactionsService = new TransactionsService();
        await expect(transactionsService.deleteTransaction(transactionData.id, user)).rejects.toMatchObject(
          new NotFoundException()
        );
      });
    });

    describe('if transaction exists', () => {
      describe('if transaction is not owned by user', () => {
        it('should throw ForbiddenException', async () => {
          jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
            const original = jest.requireActual('typeorm');
            return {
              ...original,
              findOne: jest.fn().mockResolvedValueOnce(transactionData),
            };
          });
          const transactionsService = new TransactionsService();
          await expect(
            transactionsService.deleteTransaction(transactionData.id, { ...user, id: 2 })
          ).rejects.toMatchObject(new ForbiddenException());
        });
      });

      describe('if transaction is owned by user', () => {
        describe('if task does not exist', () => {
          it('should delete transaction', async () => {
            jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
              const original = jest.requireActual('typeorm');
              return {
                ...original,
                findOne: jest.fn().mockResolvedValueOnce(transactionData),
                delete: jest.fn(),
              };
            });
            const transactionsService = new TransactionsService();
            await expect(transactionsService.deleteTransaction(transactionData.id, user)).resolves.toStrictEqual(
              transactionData
            );
          });
        });
        describe('if task exist', () => {
          describe('if transaction created is the same as task updated', () => {
            it('should make task is Complete false', async () => {
              jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
                const original = jest.requireActual('typeorm');
                return {
                  ...original,
                  findOne: jest.fn().mockResolvedValueOnce({ ...transactionData, task }),
                  update: jest.fn(),
                  delete: jest.fn(),
                };
              });
              const transactionsService = new TransactionsService();
              await expect(transactionsService.deleteTransaction(transactionData.id, user)).resolves.toStrictEqual({
                ...transactionData,
                task: { ...task, isComplete: false },
              });
            });
          });

          describe('if transaction created is not the same as task updated', () => {
            it('should make task is Complete false', async () => {
              jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
                const original = jest.requireActual('typeorm');
                return {
                  ...original,
                  findOne: jest
                    .fn()
                    .mockResolvedValueOnce({ ...transactionData, task: { ...task, updated: new Date(2020, 11, 17) } }),
                  delete: jest.fn(),
                };
              });
              const transactionsService = new TransactionsService();
              await expect(transactionsService.deleteTransaction(transactionData.id, user)).resolves.toStrictEqual({
                ...transactionData,
                task: { ...task, updated: new Date(2020, 11, 17) },
              });
            });
          });
        });
      });
    });
  });
});
