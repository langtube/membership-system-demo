import { LowdbSync } from 'lowdb';
import { ListIterateeCustom } from 'lodash';
export declare type RunInCatchFn<T> = (db: LowdbSync<T>) => any;
export declare class LowRepositoryHelper<T> {
    db: LowdbSync<T>;
    collectionName: string;
    constructor();
    runInCatch<FN extends RunInCatchFn<T>>(fn: FN): ReturnType<FN>;
    findOne(condition: ListIterateeCustom<T, boolean>): Promise<any>;
}
