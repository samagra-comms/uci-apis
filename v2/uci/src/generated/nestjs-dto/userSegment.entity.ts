
import {Service} from './service.entity'
import {Bot} from './bot.entity'


export class UserSegment {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
name: string ;
ownerID: string ;
ownerOrgID: string ;
description: string ;
count: number ;
category: string ;
all?: Service ;
byID?: Service ;
byPhone?: Service ;
allServiceID: string ;
byPhoneServiceID: string ;
byIDServiceID: string ;
bots?: Bot[] ;
botId: string  | null;
}
