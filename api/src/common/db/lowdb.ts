import { join } from 'path';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

let db;

export function getDb<T>() {
  if (!db) {
    const file = join(__dirname, 'db.json');
    const adapter = new FileSync<T>(file);
    db = low(adapter);
    db.defaults({
      users: [],
      roles: [],
      'team-members': [],
      workspaces: [],
    }).write();
  }
  return db as low.LowdbSync<T>;
}
