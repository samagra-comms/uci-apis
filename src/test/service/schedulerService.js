const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
const queueConfig = {
  connection,
};

const queueID = "queue";
const queue = new Queue(queueID, queueConfig);

queue.add("test", {});
queue.add("rest-service", {
  transformer: [
    {
      name: "PassThrough",
      id: "02f010b8-29ce-41e5-be3c-798536a2818b",
      service: "3fb0e35f-46dc-44cf-95cc-43d1df1c9a11",
    },
  ],
  service: {
    id: "3fb0e35f-46dc-44cf-95cc-43d1df1c9a11",
    type: "rest-service",
    config: {
      url: "http://localhost:8888",
    },
  },
  data:
    '"<?xml version=\\"1.0\\" encoding=\\"UTF-8\\" standalone=\\"yes\\"?>\\n<xMessage>\\n    <app>Sam-Bitly [B-TC]</app>\\n    <channel>WhatsApp</channel>\\n    <channelURI>WhatsApp</channelURI>\\n    <conversationStage>\\n        <stage>0</stage>\\n        <state>STARTING</state>\\n    </conversationStage>\\n    <from>\\n        <bot>false</bot>\\n        <broadcast>false</broadcast>\\n        <meta>\\n            <entry>\\n                <key>senderID</key>\\n                <value>HPGOVT</value>\\n            </entry>\\n        </meta>\\n        <userID>hpgovt-hpssa</userID>\\n    </from>\\n    <messageState>NOT_SENT</messageState>\\n    <messageType>HSM_WITH_BUTTON</messageType>\\n    <payload>\\n        <text>नमस्कार प्रिय शिक्षा अधिकारी, \\n\\nविद्यालय शिक्षा विभाग के *समीक्षा ऐप* पर आवशयक सूचना I\\n\\nपिछ्ले हफ्ते आपके स्कूल / खंड के कई स्कूलों में *Attendance और Temperature रिकॉर्डिंग के लिए अनुपालन कम था* I\\n\\nरिपोर्ट देखने के लिए नीचे दिए गए नीले बटन *Hi SamikshaBot* पर क्लिक करें ।</text>\\n    </payload>\\n    <provider>gupshup</provider>\\n    <providerURI>gupshup</providerURI>\\n    <timestamp>1615423372987</timestamp>\\n    <to>\\n        <bot>false</bot>\\n        <broadcast>false</broadcast>\\n        <groups>82c95b41-22e5-445c-b5ff-1d383bc8a7df</groups>\\n        <userID>9415787824</userID>\\n    </to>\\n    <transformers>\\n        <id>1</id>\\n    </transformers>\\n</xMessage>\\n"',
});