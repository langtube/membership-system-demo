import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { ACCESS_TAGS_KEY } from './access-tags';

@Injectable()
export class RequireAccessTagsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredAccessTags =
      this.reflector.get<string[]>(ACCESS_TAGS_KEY, context.getHandler()) || [];
    if (requiredAccessTags.length < 1) {
      throw new Error('AccessTags decorator must have at least one tag');
    }

    const req: Request = context.switchToHttp().getRequest();
    if (!req.user?.accessTags) {
      return false;
    }

    return requiredAccessTags.every((t) => {
      return Object.keys(req.user.accessTags).includes(t);
    });
  }
}
