import { LowdbSync } from 'lowdb';
import { ListIterateeCustom } from 'lodash';

import { DatabaseException } from '../exceptions/database.exception';
import { getDb } from './lowdb';

export type RunInCatchFn<T> = (db: LowdbSync<T>) => any;

export class LowRepositoryHelper<T> {
  db: LowdbSync<T>;

  collectionName: string;

  constructor() {
    this.db = getDb<T>();
  }

  runInCatch<FN extends RunInCatchFn<T>>(fn: FN): ReturnType<FN> {
    try {
      const result = fn(this.db);
      return result;
    } catch (e: any) {
      throw new DatabaseException(e);
    }
  }

  async findOne(condition: ListIterateeCustom<T, boolean>) {
    const result = await this.runInCatch(async (db: any) => {
      return db.get(this.collectionName).find(condition).value();
    });
    return result;
  }
}
