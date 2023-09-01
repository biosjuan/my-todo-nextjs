export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const USERS = {
  1: {
    id: 1,
    email: 'juan@test.com',
    password: 'test',
  },
};

export const TODO: any = {
  1: {
    id: 1,
    title: 'Wake up and study interview technique for 1 hr',
    completed: true,
  },
  2: {
    id: 2,
    title: 'Go for a morning walk',
    completed: false,
  },
  3: {
    id: 3,
    title: 'Read a chapter from a novel',
    completed: false,
  },
  4: {
    id: 4,
    title: 'Attend the team meeting at work',
    completed: true,
  },
  5: {
    id: 5,
    title: 'Complete the coding assignment',
    completed: false,
  },
  6: {
    id: 6,
    title: 'Prepare lunch',
    completed: true,
  },
  7: {
    id: 7,
    title: 'Practice playing the guitar',
    completed: false,
  },
  8: {
    id: 8,
    title: 'Write a blog post',
    completed: false,
  },
  9: {
    id: 9,
    title: 'Exercise at the gym',
    completed: true,
  },
  10: {
    id: 10,
    title: 'Watch a documentary',
    completed: false,
  },
  11: {
    id: 11,
    title: 'Call a friend to catch up',
    completed: true,
  },
  12: {
    id: 12,
    title: 'Review and organize emails',
    completed: false,
  },
  13: {
    id: 13,
    title: 'Cook dinner',
    completed: true,
  },
  14: {
    id: 14,
    title: 'Practice meditation',
    completed: false,
  },
  15: {
    id: 15,
    title: 'Plan the weekend trip',
    completed: false,
  },
  16: {
    id: 16,
    title: 'Read a research paper',
    completed: true,
  },
  17: {
    id: 17,
    title: 'Work on a coding side project',
    completed: false,
  },
  18: {
    id: 18,
    title: 'Write a thank-you note',
    completed: false,
  },
  19: {
    id: 19,
    title: 'Watch an online tutorial',
    completed: true,
  },
  20: {
    id: 20,
    title: 'Review and plan goals for the week',
    completed: false,
  },
};

export function findTodoById(todoId: number) {
  return TODO[todoId];
}

export function authenticate(email: string, password: string) {
  const user: any = Object.values(USERS).find((user) => user.email === email);

  if (user && user.password == password) {
    return user;
  } else {
    return undefined;
  }
}
