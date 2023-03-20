const exampleForDTO = {
  startingMessage: 'Hi Test Bot - 6',
  name: 'Test Bot - 6',
  tags: ['tag1', 'tag2'],
  users: ['8866c239-3cd9-498a-94b4-97f2696a83ec'],
  logic: ['e267d86f-fdd7-4fd5-ab37-2891e68393e6'],
  status: 'enabled',
  startDate: '2022-07-29',
  endDate: '2023-07-05',
};

export class CreateBotDto {
  startingMessage: string;
  name: string;
  tags: string[];
  users: string[];
  logic: string[];
  status: string;
  startDate: string;
  endDate: string;
}
