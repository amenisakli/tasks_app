import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    const todo = await this.todoRepository.create({ ...createTodoDto });
    return this.todoRepository.save(todo);
  }

  findAll() {
    return this.todoRepository.findBy({ status: true });
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException("Todo n'existe pas ");
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.preload({
      id: id,
      ...updateTodoDto,
    });
    if (!todo) {
      throw new NotFoundException("Todo n'existe pas ");
    }
    return this.todoRepository.save(todo);
  }

  async remove(id: number) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException("Todo n'existe pas ");
    }
    todo.status = false;
    return this.todoRepository.save(todo);
  }
}
