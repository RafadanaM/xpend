import { getRepository } from 'typeorm';
import BadRequestException from '../../exceptions/BadRequestException';
import ForbiddenException from '../../exceptions/ForbiddenException';
import NotFoundException from '../../exceptions/NotFoundException';
import createTransactionDto from '../transactions/transactions.dto';
import Transactions from '../transactions/transactions.entity';
import Users from '../users/users.entity';
import taskDto from './task.dto';
import Tasks from './tasks.entity';

class TasksService {
  private taskRepository = getRepository(Tasks);
  private transactionsRepository = getRepository(Transactions);

  private isOwned(taskUserId: Number, userId: Number) {
    if (taskUserId !== userId) {
      throw new ForbiddenException();
    }
  }

  private isMonthYearEqual(firstDate: Date, secondDate: Date): boolean {
    const firstMonthYear = new Date(firstDate.getFullYear(), firstDate.getMonth());
    const secondMonthYear = new Date(secondDate.getFullYear(), secondDate.getMonth());

    return firstMonthYear.getTime() === secondMonthYear.getTime();
  }

  public async getTasksByUserId(user: Users): Promise<Tasks[]> {
    const tasks = await this.taskRepository.find({
      where: { user: { id: user.id } },
      order: { created: 'ASC' },
    });

    return Promise.all(
      tasks.map(async (task) => {
        const transaction = await this.transactionsRepository.findOne({
          relations: ['task'],
          where: { task: { id: task.id } },
          order: { created: 'DESC' },
        });
        if (transaction && task.isComplete) {
          task.transactions = [transaction];
        } else {
          task.transactions = [];
        }

        return task;
      })
    );
  }

  public async createTask(taskData: taskDto, user: Users): Promise<Tasks> {
    const newTask = this.taskRepository.create({ ...taskData, user });
    await this.taskRepository.save(newTask);
    return newTask;
  }

  public async completeTask(taskId: number, user: Users, transactionData: createTransactionDto): Promise<any> {
    const task = await this.taskRepository.findOne({
      relations: ['user'],
      where: { id: taskId, user: { id: user.id } },
    });
    if (!task) {
      throw new NotFoundException();
    }
    this.isOwned(task.user.id, user.id);

    //check if task is completed
    if (task.isComplete) {
      throw new BadRequestException('Task is already complete');
    }

    //should be a database transaction
    // create new transaction then toggle the task to true
    const newTransaction = this.transactionsRepository.create({ ...transactionData, user: user, task: task });
    const transaction = await this.transactionsRepository.save(newTransaction);
    await this.taskRepository.update({ id: taskId }, { isComplete: true });
    delete newTransaction.task;

    return { task: { ...task, isComplete: true }, transaction };
  }

  public async undoTask(taskId: number, user: Users): Promise<{ task: Tasks; transaction: Transactions | undefined }> {
    const task = await this.taskRepository.findOne({
      relations: ['user'],
      where: { id: taskId, user: { id: user.id } },
    });

    if (!task) {
      throw new NotFoundException();
    }

    if (!task.isComplete) {
      throw new BadRequestException('Task is already incomplete');
    }
    let transaction = await this.transactionsRepository.findOne({
      where: { task: { id: taskId } },
      order: { created: 'DESC' },
    });

    //I CANT TEST THIS, JEST MOCK ALWAYS RETURNS TASKDATA INSTEAD OF UNDEFINED WTFFFFFFFFF!!!!!!!!!!!!!!!!!!!!!!!!
    if (!transaction) {
      throw new NotFoundException();
    }
    // check if the task created and toggle update has the same month and year
    // if true, then delete the corresponsing transaction then toggle task to false
    // else just toggle the task to false
    if (this.isMonthYearEqual(transaction.created, task.updated)) {
      await this.transactionsRepository.delete({ id: transaction.id });
    } else {
      transaction = undefined;
    }
    await this.taskRepository.update({ id: taskId }, { isComplete: false });

    return { task: { ...task, isComplete: false }, transaction };
  }

  public async deleteTask(taskId: number, user: Users): Promise<Tasks> {
    const task = await this.taskRepository.findOne({
      relations: ['user'],
      where: { id: taskId, user: { id: user.id } },
    });

    if (!task) {
      throw new NotFoundException();
    }

    await this.taskRepository.delete({ id: taskId });
    return task;
  }

  public async editTask(id: number, data: Partial<taskDto>, user: Users): Promise<Tasks> {
    let task = await this.taskRepository.findOne({ relations: ['user'], where: { id: id, user: { id: user.id } } });
    if (!task) {
      throw new NotFoundException();
    }
    const updatedData: Partial<taskDto> = { ...data };
    await this.taskRepository.update({ id }, { ...updatedData });
    return { ...task, ...data };
  }
}

export default TasksService;
