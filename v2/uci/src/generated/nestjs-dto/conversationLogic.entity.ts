
import {Transformer} from './transformer.entity'
import {Adapter} from './adapter.entity'
import {Bot} from './bot.entity'


export class ConversationLogic {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
description: string  | null;
ownerID: string  | null;
ownerOrgID: string  | null;
transformers?: Transformer[] ;
adapter?: Adapter ;
adapterId: string ;
bots?: Bot[] ;
}
