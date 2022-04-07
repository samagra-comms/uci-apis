## Core Modules

Includes the modules related to all the entities in the system.

1. Adapter
2. Bot
3. Conversation Logic
4. Secrets
5. Service (Defines an external service - GQL, GET, POST, etc.)
6. Transformers
7. User Segments

The structure of each of the modules follows the standard NestJS structure.

- Service - Fetch data from DB using prisma or call an external API
- Controllers - Manage routes
- Spec.ts - Tests
