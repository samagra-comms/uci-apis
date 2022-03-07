
import {UserSegment} from './userSegment.entity'
import {ConversationLogic} from './conversationLogic.entity'


export class Bot {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
name: string ;
startingMessage: string ;
users?: UserSegment[] ;
logicIDs?: ConversationLogic[] ;
ownerID: string ;
ownerOrgID: string ;
purpose: string ;
description: string ;
startDate: Date ;
endDate: Date ;
}
