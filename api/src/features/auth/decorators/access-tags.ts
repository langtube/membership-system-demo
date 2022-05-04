import { SetMetadata } from '@nestjs/common';

export const ACCESS_TAGS_KEY = 'access_tags';

export const AccessTags = (
  ...tags: ('access-team-member' | 'access-workspace')[]
) => {
  if (!tags || tags.length < 1) {
    throw new Error('AccessTags decorator must have at least one tag');
  }
  return SetMetadata(ACCESS_TAGS_KEY, tags);
};
