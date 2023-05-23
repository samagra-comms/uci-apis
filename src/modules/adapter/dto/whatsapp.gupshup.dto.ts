interface GupshupWhatsappAdapterConfig {
  phone: string;
  HSM_ID: string;
  '2WAY': string;
  credentials: { [key: string]: string };
}

export type WhatsappGupshupAdapterDTO = {
  channel: string;
  provider: string;
  name: string;
  config: GupshupWhatsappAdapterConfig;
};
