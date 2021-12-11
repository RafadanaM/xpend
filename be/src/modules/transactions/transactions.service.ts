import { getRepository } from 'typeorm';
import ForbiddenException from '../../exceptions/ForbiddenException';
import NotFoundException from '../../exceptions/NotFoundException';
import Users from '../users/users.entity';
import createTransactionDto from './transactions.dto';
import Transactions from './transactions.entity';

class TransactionsService {
  private transactionsRepository = getRepository(Transactions);

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
    const transaction = await this.transactionsRepository.findOne({ relations: ['user'], where: { id: id } });
    if (!transaction) {
      throw new NotFoundException();
    }
    this.isOwned(transaction.user.id, user.id);
    await this.transactionsRepository.delete({ id });
    return transaction;
  }
}

export default TransactionsService;
