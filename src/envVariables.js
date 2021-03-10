const envVariables = {
  baseURL: process.env.dock_base_url || "https://dock.sunbirded.org",
  SUNBIRD_URL: process.env.sunbird_base_url || "https://dev.sunbirded.org",
  SUNBIRD_PORTAL_API_AUTH_TOKEN: process.env.sunbird_api_auth_token || "",
  DOCK_CHANNEL: process.env.dock_channel || "sunbird",
  port: process.env.sunbird_program_port || 9999,
  CACHE_TTL: process.env.dock_cache_ttl || 900,
  level: process.env.sunbird_service_log_level || "info",
  LEARNING_SERVICE_URL:
    process.env.learning_service_url || "https://dock.sunbirded.org/action/",
  CONTENT_SERVICE_URL:
    process.env.content_service_url || "https://dock.sunbirded.org/action/",
  OPENSABER_SERVICE_URL:
    process.env.opensaber_service_url ||
    "https://dock.sunbirded.org/content/reg",
  SUNBIRD_KAFKA_HOST: process.env.sunbird_kafka_host,
  DOCK_REDIS_HOST: process.env.dock_redis_host,
  DOCK_REDIS_PORT: process.env.dock_redis_port || 6379,
  SUNBIRD_AUTO_CREATION_TOPIC: process.env.sunbird_auto_creation_topic,
  config: {
    user: process.env.sunbird_program_db_user || "postgres",
    host: process.env.sunbird_program_db_host || "localhost",
    database: process.env.sunbird_program_db_name || "sunbird_programs",
    password: process.env.sunbird_program_db_password || "password",
    port: process.env.sunbird_program_db_port || 5432,
    dialect: process.env.sunbird_program_db_dialect || "postgres",
    logging: false,
    pool: {
      max: process.env.sunbird_program_db_pool
        ? Number(process.env.sunbird_program_db_pool)
        : 100,
    },
  },
  telemetryConfig: {
    host: process.env.telemetry_service_host,
    endpoint: process.env.telemetry_service_endpoint,
    method: "POST",
  },
};
module.exports = envVariables;
