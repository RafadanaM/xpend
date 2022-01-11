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

  private createTransaction = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const transactionData: createTransactionDto = req.body;
      console.log(transactionData);

      if (!req.user) {
        throw new NotFoundException();
      }
      res.send(await this.transactionsService.createTransaction(transactionData, req.user));
    } catch (error) {
      next(error);
    }
  };

  private getTransactionsByUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new NotFoundException();
      }
      console.log(req.query);
      //idk how to properly type it except this casting thing
      const queries = req.query as unknown as SearchDTO;
      res.send(await this.transactionsService.getTransactionsByUser(req.user, queries.name, queries.date));
    } catch (error) {
      next(error);
    }
  };

  private getTransactionsByTransactionId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
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

  private getThisMonthTransactions = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new NotFoundException();
      }
      const { timeZone }: timeZoneDTO = req.body;
      res.send(await this.transactionsService.getThisMonthTransactions(timeZone, req.user));
    } catch (error) {
      next(error);
    }
  };

  private editTransaction = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new NotFoundException();
      }
      const transactionId = parseInt(req.params.id);
      const data: createTransactionDto = req.body;
      res.send(await this.transactionsService.editTransaction(transactionId, data, req.user));
    } catch (error) {
      next(error);
    }
  };

  private deleteTransaction = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new NotFoundException();
      }
      const transactionId = parseInt(req.params.id);
      res.send(await this.transactionsService.deleteTransaction(transactionId, req.user));
    } catch (error) {
      next(error);
    }
  };
}

export default TransactionsController;
