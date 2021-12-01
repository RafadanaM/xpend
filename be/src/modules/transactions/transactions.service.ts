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

  public async getTransactionsByUser(id: number): Promise<Transactions[]> {
    return await this.transactionsRepository.find({ relations: ["user"], where: { user: { id : id } } });
  }

  public async getTransactionsByTransactionId(id: number, user: Users): Promise<Transactions> {
    const transaction = await this.transactionsRepository.findOne({ relations: ["user"], where: { id: id } });
    if (!transaction) {
      throw new NotFoundException();
    }
    this.isOwned(transaction.user.id, user.id)
    return transaction;
  }
}

export default TransactionsService;
