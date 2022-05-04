import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { existsSync, statSync } from 'node:fs';

export function serveReactAppMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { url } = req;
  if (url.startsWith('/api')) {
    next();
  } else {
    let filePath = join(process.cwd(), '../app', url);
    const isExits = existsSync(filePath);
    if (!isExits || (isExits && statSync(filePath).isDirectory())) {
      filePath = join(process.cwd(), '../app', '/index.html');
    }
    res.sendFile(filePath);
  }
}
