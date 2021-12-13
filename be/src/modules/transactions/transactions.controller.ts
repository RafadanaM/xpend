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
<<<<<<< HEAD
// import SearchDto from '../../shared/search.dto';
=======
import SearchDto from '../../shared/search.dto';
>>>>>>> 75f28135a1b0b8c000be6d9e5cfb2f9b10c10740

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
    this.router.get(
<<<<<<< HEAD
      '/search',
      authMiddleware,
      // validationMiddleware(SearchDto, RequestTypes.PARAMS, true),
=======
      '/:search',
      authMiddleware,
      validationMiddleware(SearchDto, RequestTypes.PARAMS),
>>>>>>> 75f28135a1b0b8c000be6d9e5cfb2f9b10c10740
      this.getTransactionsWithSearch
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
      res.send(await this.transactionsService.getTransactionsByUser(req.user));
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

  private getTransactionsWithSearch = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new NotFoundException();
      }
<<<<<<< HEAD
      // const search = req.params.search;
      const search = req.query.search || "";
      const date = req.query.date || "";
      console.log(search);
      console.log(date);
      res.send(await this.transactionsService.getTransactionsWithSearch(search, date, req.user));
=======
      const search = req.params.search;
      res.send(await this.transactionsService.getTransactionsWithSearch(search,req.user));
>>>>>>> 75f28135a1b0b8c000be6d9e5cfb2f9b10c10740
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
