import { getRepository } from 'typeorm';
import ForbiddenException from '../../exceptions/ForbiddenException';
import NotFoundException from '../../exceptions/NotFoundException';
import Tasks from '../tasks/tasks.entity';
import Users from '../users/users.entity';
import createTransactionDto from './transactions.dto';
import Transactions from './transactions.entity';

class TransactionsService {
  private transactionsRepository = getRepository(Transactions);
  private tasksRepository = getRepository(Tasks);

  private isOwned(idUserInTransaction: Number, idUser: Number) {
    if (idUserInTransaction !== idUser) {
      throw new ForbiddenException();
    }
  }

  public async createTransaction(transactionsData: createTransactionDto, user: Users): Promise<Transactions> {
    const newTransaction = this.transactionsRepository.create({ ...transactionsData, user: user });
    await this.transactionsRepository.save(newTransaction);
    return newTransaction;
  }

  public async getTransactions(): Promise<Transactions[]> {
    return await this.transactionsRepository.find();
  }

  public async getTransactionsByUser(user: Users): Promise<Transactions[]> {
    return await this.transactionsRepository.find({ relations: ['user'], where: { user: { id: user.id } } });
  }

  public async getTransactionsByTransactionId(id: number, user: Users): Promise<Transactions> {
    const transaction = await this.transactionsRepository.findOne({ relations: ['user'], where: { id: id } });
    if (!transaction) {
      throw new NotFoundException();
    }
    this.isOwned(transaction.user.id, user.id);
    return transaction;
  }

<<<<<<< HEAD
  public async getTransactionsWithSearch(search: any, date: any, user: Users): Promise<Transactions[]> {
    let transactions = await this.transactionsRepository.find({
      relations: ['user'],
      where: { user: { id: user.id } },
    });
    if (search !== "") {
      transactions = transactions.filter((transaction) => {
        return transaction.title.includes(search) || transaction.description.includes(search);
      });
    }
    if (date !== "") {
      transactions = transactions.filter((transaction) => {
        const transactionDate = transaction.date.toISOString().substring(0,7)
        return transactionDate === date;
      });
    }
    return transactions;
=======
  public async getTransactionsWithSearch(search: string, user: Users): Promise<Transactions[]> {
    const transactions = await this.transactionsRepository.find({
      relations: ['user'],
      where: { user: { id: user.id } },
    });
    console.log(transactions);
    return transactions.filter((transaction) => {
      console.log(transaction.title.includes(search), transaction.description.includes(search));
      return transaction.title.includes(search) || transaction.description.includes(search);
    });
>>>>>>> 75f28135a1b0b8c000be6d9e5cfb2f9b10c10740
  }

  public async editTransaction(id: number, data: Partial<createTransactionDto>, user: Users): Promise<Transactions> {
    let transaction = await this.transactionsRepository.findOne({ relations: ['user'], where: { id: id } });
    if (!transaction) {
      throw new NotFoundException();
    }
    this.isOwned(transaction.user.id, user.id);
    const updatedData: Partial<createTransactionDto> = { ...data };
    await this.transactionsRepository.update({ id }, { ...updatedData });
    transaction = await this.transactionsRepository.findOneOrFail({ relations: ['user'], where: { id: id } });
    return transaction;
  }

  public async deleteTransaction(id: number, user: Users): Promise<Transactions> {
    const transaction = await this.transactionsRepository.findOne({ relations: ['user', 'task'], where: { id: id } });
    if (!transaction) {
      throw new NotFoundException();
    }
    this.isOwned(transaction.user.id, user.id);
    // if transaction has task check if the task created and toggle update has the same month and year
    // if yes then toggle the task to false then delete the transaction
    // else just delete the transaction
    console.log(transaction);

    if (transaction.task) {
      console.log(transaction.task);

      const transactionCreated = new Date(transaction.created.getFullYear(), transaction.created.getMonth());
      const taskModified = new Date(transaction.task.updated.getFullYear(), transaction.task.updated.getMonth());
      if (transactionCreated.getTime() === taskModified.getTime()) {
        await this.tasksRepository.update({ id: transaction.task.id }, { isComplete: false });
      }
      transaction.task.isComplete = false;
    }
    await this.transactionsRepository.delete({ id });

    return transaction;
  }
}

export default TransactionsService;
