import { getRepository } from 'typeorm';
import createTransactionDto from './transactions.dto';
import Transactions from './transactions.entity';

class TransactionsService {
  private transactionsRepository = getRepository(Transactions);

  public async createTransaction(transactionsData: createTransactionDto): Promise<Transactions> {
    const newTransaction = this.transactionsRepository.create(transactionsData);
    await this.transactionsRepository.save(newTransaction);
    return newTransaction;
  }

  public async getTransactions(): Promise<Transactions[]> {
    return await this.transactionsRepository.find();
  }
}

export default TransactionsService;
