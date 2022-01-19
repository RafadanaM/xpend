import { Between, getRepository, ILike } from 'typeorm';
import ForbiddenException from '../../exceptions/ForbiddenException';
import NotFoundException from '../../exceptions/NotFoundException';
import { EditTransactionResponse, TransactionSummaryResponse } from '../../interfaces/response.interface';
import getCorrectedStartEndMonth from '../../utils/getCorrectedStartEndMonth';
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

  public async getTransactionsByUser(user: Users, name: string, date: string): Promise<Transactions[]> {
    if (name !== '' && date !== '') {
      const inputDate = new Date(date);
      const { startMonth, endMonth } = getCorrectedStartEndMonth(inputDate);
      return await this.transactionsRepository.find({
        relations: ['user'],
        where: [
          { title: ILike(`%${name}%`), date: Between(startMonth, endMonth), user: { id: user.id } },
          { description: ILike(`%${name}%`), date: Between(startMonth, endMonth), user: { id: user.id } },
        ],
      });
    }

    if (name !== '')
      return await this.transactionsRepository.find({
        relations: ['user'],
        where: [
          { title: ILike(`%${name}%`), user: { id: user.id } },
          { description: ILike(`%${name}%`), user: { id: user.id } },
        ],
      });
    if (date !== '') {
      const inputDate = new Date(date);
      const { startMonth, endMonth } = getCorrectedStartEndMonth(inputDate);
      return await this.transactionsRepository.find({
        relations: ['user'],
        where: { date: Between(startMonth, endMonth), user: { id: user.id } },
      });
    }

    return await this.transactionsRepository.find({ relations: ['user'], where: { user: { id: user.id } } });
  }

  public async getThisMonthTransactions(timeZone: number, user: Users): Promise<TransactionSummaryResponse> {
    //not so sure about this
    const date = new Date();
    const { startMonth, endMonth } = getCorrectedStartEndMonth(date, timeZone);

    let transactions = await this.transactionsRepository.find({
      relations: ['user'],
      where: { user: { id: user.id }, date: Between(startMonth, endMonth) },
    });
    let gained = 0;
    let spent = 0;
    const totalTransactions = transactions.length;

    transactions.forEach((transaction) => {
      if (transaction.amount >= 0) {
        gained += transaction.amount;
      } else {
        spent -= transaction.amount;
      }
    });

    return { gained, spent, totalTransactions };
  }

  public async editTransaction(
    id: number,
    data: Partial<createTransactionDto>,
    user: Users
  ): Promise<EditTransactionResponse> {
    const transaction = await this.transactionsRepository.findOne({ relations: ['user'], where: { id: id } });
    if (!transaction) {
      throw new NotFoundException();
    }
    this.isOwned(transaction.user.id, user.id);
    const updatedData: Partial<createTransactionDto> = { ...data };
    await this.transactionsRepository.update({ id }, { ...updatedData });
    // const updatedTransaction = await this.transactionsRepository.findOneOrFail({
    //   relations: ['user'],
    //   where: { id: id },
    // });
    return { prevTransaction: transaction, updatedTransaction: { ...transaction, ...updatedData } };
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
