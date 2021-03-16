# Unified Communications Interface (UCI)

[![Open Source Love](https://camo.githubusercontent.com/d41b9884bd102b525c8fb9a8c3c8d3bbed2b67f0/68747470733a2f2f6261646765732e66726170736f66742e636f6d2f6f732f76312f6f70656e2d736f757263652e7376673f763d313033)](https://opensource.org/licenses/MIT)  [![License: MIT](https://camo.githubusercontent.com/3ccf4c50a1576b0dd30b286717451fa56b783512/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d79656c6c6f772e737667)](https://opensource.org/licenses/MIT) 

 - [Overview](https://github.com/Samagra-Development/UCI#overview)
 - [Functional Blocks](https://github.com/Samagra-Development/UCI#functional-blocks)  
 - [Technical Architecture](https://github.com/Samagra-Development/UCI#technical-architecture)
 - [Core Features](https://github.com/Samagra-Development/UCI#core-features)
 - [Core Concepts](https://github.com/Samagra-Development/UCI#core-concepts)
 - [API Documentation](https://github.com/Samagra-Development/UCI#api-documentation)
 - [Contribution Guide](https://github.com/Samagra-Development/UCI#contibution-guide)

## [](https://github.com/Samagra-Development/UCI#overview)Overview

Unified Communications Interface (UCI) is a system that powers governments to create and manage conversations with citizens and with its own officials. Through UCI governments can seamlessly setup simple and complex conversations using a multi-channel approach. UCI aims to democratize the use of different communication channels such as WhatsApp, Telegram, SMS, email for governance use cases through a standard configurable manner that is reusable and scalable across all governance use cases.

With the onset of Covid19 in 2020, the need for proactive engagement accelerated across all governments. UCI was designed after understanding diverse governance use cases that were emerging across different departments of multiple state governments. 

## [](https://github.com/Samagra-Development/UCI#functional-blocks)Functional Blocks

The block diagram below outlines the various components that come together to form the Unified Communications Interface. 
![](https://github.com/Samagra-Development/comms-manager/blob/master/docs/funcblocks.png)

A glossary of the terms used in the UCI design are available below:
1. **Adapter** - An adapter translates between messages received from communication channels on specific providers and the internal XMessage format. *A new adapter is created for every combination of communication channel and service provider (e.g. - WhatsApp + Gupshup; WhatsApp + NetCore; WhatsApp + Twilio). An adapter config references the communication channel, service provider and associated metadata such as specific business account phone number.*
2. **Admin Console** - An application that is built to consume UCI APIs, to enable bot configuration and visualizations on top of UCI configuration and conversation data.
3. **Bot** - A bot orchestrates a conversation with a specific conversation logic assigned to a set of users. A bot remembers the state of a conversation for a particular user. A bot object references user segment(s) and conversation logic(s). 
4. **Communication Channel** - Any application or channel that allows users to connect with each other to exchange information. Examples of communication channels include (but not limited to), WhatsApp, SMS, Email, Slack, IVRS, Telegram.
5. **Conversation** - Any exchange of recorded messages between two parties (users or systems) is called a conversation. 
6. **Conversation Data** - All the data that is generated as a result of the communication on the bot. User input data as well as bot responses are called as conversation data.
7. **Conversation Logic** - Conversation logic defines the control flow for a specific conversation. A conversation logic object references a sequence of transformers that will be applied to arrive at the final response at a specific point in the conversation, and the associated adapter config for this conversation logic. (e.g. XForm logic, translation into Hindi - both associated with a Whatsapp-Gupshup adapter)
8. **Logs** - All the inbound and outbound interactions that happen with the bot are captured and stored.
9. **Register a bot** - An API that allows users to register for a new bot.  
10. **Remote Data Repositories** - Any remote repositories (e.g. user db, content db or others) required in a conversation logic can be to be accessed.
11. **Role Based Access Control** - Role-based access control or role-based security is an approach to restricting system access to authorized users. Amongst other functions this restricts bot usage only to an authorized group of users.
12. **Service Provider** - Any public or private organization that provides the service of gathering the response from the Communication Application and transmits the same over standard API’s to this Unified Communications Interface. Examples of service providers include (but not limited to) Gupshup, Twillo, Infobip, Netcore. 
13. **Standards** - These are set of standards that are defined in this Unified Communication Interfaces. These standards are the guardians and helpers to ensure basic functioning and to some extent modularity.
14. **Transformer** - A transformer is a stateless processing object that takes inputs and converts the input into a processed response. Transformers may in turn call external services if needed.  For example - Open Data Kit (ODK) 
15. **User** - Any person or system that interacts with the bot.
16. **User Registry (Local, Federated)** - A place (index, directory or registry) where users profile data is stored, this can be a local storage as part of the Communication bot or a federated storage at different databases.
17. **XForms** - XForms is an XML markup for a new generation of forms and form-like applications on the Web.
18. **XMPP | XMessage** - This is a standard defined for the UCI ecosystem. Key objective of this is to make the internal functioning UCI, independent of external factors viz. Communication channel and service provider.

## [](https://github.com/Samagra-Development/UCI#technical-architecture)Technical Architecture 

The flow diagram below provides a brief overview of the technology design. See [Wiki](https://github.com/Samagra-Development/UCI/wiki) for the detailed **technical architecture diagram**.

![](https://github.com/Samagra-Development/comms-manager/blob/master/docs/techover.png)

## [](https://github.com/Samagra-Development/UCI#core-features)Core Features
- Ability to connect to any communication channel through any service provider without doing custom changes in the core logic UCI.
- UCI ecosystem is  independent of external variables like communication channel and service provider powered by XMessage standard.
- Ability to have a configurable conversation logic for the bot
- Ability to connect to any database (local or federated) via services
- Ability to include value added services in the bot interaction flow through Microservices (Internal or External) 
- Ability to create tools on top of UCI APIs to manage Bot configuration, conversations and visualization

## [](https://github.com/Samagra-Development/UCI#core-concepts)Core Concepts
Every interaction with the conversation bot has the following core elements:
1. **Bot** - A bot orchestrates a conversation with a specific conversation logic assigned to a set of users. A bot remembers the state of a conversation for a particular user. A bot object references user segment(s) and conversation logic(s).
2. **User Segment** - User segment contains user data including mechanism to fetch them from a federated user registry.
3. **Adapter** - An adapter translates between messages received from communication channels on specific providers and the internal XMessage format. A new adapter is created for every combination of communication channel and service provider (e.g. - WhatsApp + Gupshup; WhatsApp + NetCore; WhatsApp + Twilio). An adapter config references the communication channel, service provider and associated metadata such as specific business account phone number.
4. **Conversation Logic** - Conversation logic defines the control flow for a specific conversation. A conversation logic object references a sequence of transformers that will be applied to arrive at the final response at a specific point in the conversation, and the associated adapter config for this conversation logic. (e.g. XForm logic, translation into Hindi - both associated with a Whatsapp-Gupshup adapter).
5. **Transformer** - A transformer is a stateless processing object that takes inputs and converts the input into a processed response. Transformers  may in turn call external services if needed.

## [](https://github.com/Samagra-Development/UCI#api-documentation)API Documentation

View the API documentation [here](https://documenter.getpostman.com/view/7043186/Tz5qaxaN)

## [](https://github.com/Samagra-Development/UCI#contibution-guide)Contibution Guide

The template has been taken from Sunbird's program service and extended for our purposed for creating APIs.

See [Wiki](https://github.com/Samagra-Development/UCI/wiki) for installation instruction and Contribution Guide.
