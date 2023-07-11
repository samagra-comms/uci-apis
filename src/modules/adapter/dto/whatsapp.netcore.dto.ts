interface NetcoreWhatsappAdapterConfig {
  phone: string;
  HSM_ID: string;
  '2WAY': string;
  credentials: { [key: string]: string };
}

export type WhatsappNetcoreAdapterDTO = {
  channel: string;
  provider: string;
  name: string;
  config: NetcoreWhatsappAdapterConfig;
};
