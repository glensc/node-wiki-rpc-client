export type PageidsInput = {
  lock?: string[],
  unlock?: string[],
};

export type PageidsReturn = {
  locked: string[],
  lockfail: string[],
  unlocked: string[],
  unlockfail: string[],
};

export type CreateUserInput = {
  user: string,
  password?: string,
  name: string,
  mail: string,
  groups?: string[],
  notify?: boolean,
};
