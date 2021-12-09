import { getRepository } from 'typeorm';
import Tasks from './tasks.entity';

class TasksService {
  private taskRepository = getRepository(Tasks);
}

export default TasksService;
