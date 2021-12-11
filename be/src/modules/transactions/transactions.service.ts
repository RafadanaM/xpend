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

  public async getTransactionsByUser(id: number): Promise<Transactions[]> {
    return await this.transactionsRepository.find({ relations: ['user'], where: { user: { id: id } } });
  }

  public async getTransactionsByTransactionId(id: number, user: Users): Promise<Transactions> {
    const transaction = await this.transactionsRepository.findOne({ relations: ['user'], where: { id: id } });
    if (!transaction) {
      throw new NotFoundException();
    }
    this.isOwned(transaction.user.id, user.id);
    return transaction;
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
    if (transaction.task) {
      const transactionCreated = new Date(transaction.created.getFullYear(), transaction.created.getMonth());
      const taskModified = new Date(transaction.task.updated.getFullYear(), transaction.task.updated.getMonth());
      if (transactionCreated === taskModified) {
        await this.tasksRepository.update({ id: transaction.task.id }, { isComplete: false });
      }
    }
    await this.transactionsRepository.delete({ id });
    return transaction;
  }
}

export default TransactionsService;
