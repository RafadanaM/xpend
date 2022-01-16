import { Router, Response, NextFunction, Request } from 'express';
import { RequestTypes } from '../../enums/request.enum';
import Controller from '../../interfaces/controller.interface';
import validationMiddleware from '../../middlewares/validation.middleware';
import createTransactionDto from './transactions.dto';
import TransactionsService from './transactions.service';
import authMiddleware from '../../middlewares/auth.middleware';
import ParamDto from '../../shared/param.dto';
import timeZoneDTO from './timeZone.dto';
import SearchDTO from './search.dto';

class TransactionsController implements Controller {
  public path: string = '/transactions';
  public router: Router = Router();
  public transactionsService: TransactionsService;

  constructor() {
    this.transactionsService = new TransactionsService();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      '',
      authMiddleware,
      validationMiddleware(SearchDTO, RequestTypes.QUERY),
      this.getTransactionsByUser
    );
    this.router.post(
      '/summary',
      authMiddleware,
      validationMiddleware(timeZoneDTO, RequestTypes.BODY),
      this.getThisMonthTransactions
    );
    this.router.get(
      '/:id',
      authMiddleware,
      validationMiddleware(ParamDto, RequestTypes.PARAMS),
      this.getTransactionsByTransactionId
    );
    this.router.post(
      '',
      authMiddleware,
      validationMiddleware(createTransactionDto, RequestTypes.BODY),
      this.createTransaction
    );
    this.router.patch(
      '/:id',
      authMiddleware,
      validationMiddleware(ParamDto, RequestTypes.PARAMS),
      validationMiddleware(createTransactionDto, RequestTypes.BODY, true),
      this.editTransaction
    );
    this.router.delete(
      '/:id',
      authMiddleware,
      validationMiddleware(ParamDto, RequestTypes.PARAMS),
      this.deleteTransaction
    );
  }

  private createTransaction = async (
    req: Request<{}, {}, createTransactionDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const transactionData = req.body;

      res.send(await this.transactionsService.createTransaction(transactionData, req.user));
    } catch (error) {
      next(error);
    }
  };

  // Theres gotta be a better way to type the params & query
  private getTransactionsByUser = async (
    req: Request<{}, {}, {}, { name: string; date: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log(req.query);
      const queries = req.query;
      res.send(await this.transactionsService.getTransactionsByUser(req.user, queries.name, queries.date));
    } catch (error) {
      next(error);
    }
  };

  private getTransactionsByTransactionId = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      res.send(await this.transactionsService.getTransactionsByTransactionId(+id, req.user));
    } catch (error) {
      next(error);
    }
  };

  private getThisMonthTransactions = async (
    req: Request<{}, {}, timeZoneDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { timeZone } = req.body;
      res.send(await this.transactionsService.getThisMonthTransactions(timeZone, req.user));
    } catch (error) {
      next(error);
    }
  };

  private editTransaction = async (
    req: Request<{ id: string }, {}, createTransactionDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body;
      res.send(await this.transactionsService.editTransaction(+id, data, req.user));
    } catch (error) {
      next(error);
    }
  };

  private deleteTransaction = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      res.send(await this.transactionsService.deleteTransaction(+id, req.user));
    } catch (error) {
      next(error);
    }
  };
}

export default TransactionsController;
