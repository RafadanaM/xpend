import { Router, Request, Response, NextFunction } from 'express';
import { RequestTypes } from '../../enums/request.enum';
import Controller from '../../interfaces/controller.interface';
import validationMiddleware from '../../middlewares/validation.middleware';
import createTransactionDto from './transactions.dto';
import TransactionsService from './transactions.service';
import authMiddleware from '../../middlewares/auth.middleware';

class TransactionsController implements Controller {
  public path: string = '/transactions';
  public router: Router = Router();
  public transactionsService: TransactionsService;

  constructor() {
    this.transactionsService = new TransactionsService();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('', authMiddleware, this.getTransactions);
    this.router.post('', validationMiddleware(createTransactionDto, RequestTypes.BODY), this.createTransaction);
  }

  private createTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const transactionData: createTransactionDto = req.body;
      res.send(await this.transactionsService.createTransaction(transactionData));
    } catch (error) {
      next(error);
    }
  };

  private getTransactions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.send(await this.transactionsService.getTransactions());
    } catch (error) {
      next(error);
    }
  };
}

export default TransactionsController;
