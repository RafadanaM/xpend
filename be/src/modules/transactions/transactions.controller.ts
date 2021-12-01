import { Router, Response, NextFunction } from 'express';
import { RequestTypes } from '../../enums/request.enum';
import Controller from '../../interfaces/controller.interface';
import validationMiddleware from '../../middlewares/validation.middleware';
import createTransactionDto from './transactions.dto';
import TransactionsService from './transactions.service';
import authMiddleware from '../../middlewares/auth.middleware';
import RequestWithUser from '../../interfaces/requestWithUser.interface';
import NotFoundException from '../../exceptions/NotFoundException';
import ParamDto from '../../shared/param.dto';


class TransactionsController implements Controller {
  public path: string = '/transactions';
  public router: Router = Router();
  public transactionsService: TransactionsService;

  constructor() {
    this.transactionsService = new TransactionsService();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('', authMiddleware, this.getTransactionsByUser);
    this.router.get('/:id', authMiddleware, validationMiddleware(ParamDto, RequestTypes.PARAMS), this.getTransactionsByTransactionId);
    this.router.post('', authMiddleware, validationMiddleware(createTransactionDto, RequestTypes.BODY), this.createTransaction);
  }

  private createTransaction = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const transactionData: createTransactionDto = req.body;
      if (!req.user) {
        throw new NotFoundException();
      }
      res.send(await this.transactionsService.createTransaction(transactionData, req.user));
    } catch (error) {
      next(error);
    }
  };

  // private getTransactions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // try {
  //     res.send(await this.transactionsService.getTransactions());
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  private getTransactionsByUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new NotFoundException();
      }
      res.send(await this.transactionsService.getTransactionsByUser(req.user.id));
    } catch (error) {
      next(error);
    }
  };

  private getTransactionsByTransactionId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new NotFoundException();
      }
      const transactionId = parseInt(req.params.id);
      res.send(await this.transactionsService.getTransactionsByTransactionId(transactionId, req.user));
    } catch (error) {
      next(error);
    }
  };
}

export default TransactionsController;
