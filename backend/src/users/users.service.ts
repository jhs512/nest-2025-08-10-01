import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<User[]> {
    return this.em.find(User, {});
  }

  async findOne(id: number): Promise<User | null> {
    return this.em.findOne(User, { id });
  }

  async create(name: string, email: string): Promise<User> {
    const user = this.em.create(User, { name, email });
    await this.em.persistAndFlush(user);
    return user;
  }
}
