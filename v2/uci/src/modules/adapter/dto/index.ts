import { WhatsappGupshupAdapterDTO } from './whatsapp.gupshup.dto';
import { WhatsappNetcoreAdapterDTO } from './whatsapp.netcore.dto';

type AdapterDTO = WhatsappGupshupAdapterDTO | WhatsappNetcoreAdapterDTO;

export { AdapterDTO };
