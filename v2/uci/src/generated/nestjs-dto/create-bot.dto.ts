export class CreateBotDto {
  name: string;
  startingMessage: string;
  ownerID: string;
  ownerOrgID: string;
  purpose: string;
  description: string;
  startDate: Date;
  endDate: Date;
}
