import { app } from './app.config';
import { text } from './text.config';
import { time } from './time.config';
import { url } from './url.config';
import { user } from './user.config';
import { rq } from './rq.config';

export const configs = {
  app,
  text,
  time,
  url,
  user,
  rq,
};

export * from './env';
