exports.programUpdate = {
  program_id: "",
  description: "description update by testCases",
  rolemapping: { REVIEWER: ["f7dab7bc-b9ea-457a-b4d9-7633fbd9736c"] },
};

exports.mandatoryFieldsProgramCreate = ["config", "type"]; // ['config', 'type', 'status', 'createdby']
exports.mandatoryFieldsProgramUpdate = ["program_id"]; // ['program_id', 'status', 'updatedby']

exports.nominationAdd = {
  program_id: "",
  user_id: "f7dab7bc-b9ea-457a-b4d9-7633fbd9736c",
  status: "Initiated",
  content_types: ["PracticeQuestionSet"],
  organisation_id: "4fe5d899-dc3e-48de-b0b6-891e0922d371",
  createdby: "f7dab7bc-b9ea-457a-b4d9-7633fbd9736c",
};

exports.nominationUpdate = {
  program_id: "",
  user_id: "f7dab7bc-b9ea-457a-b4d9-7633fbd9736c",
  status: "Pending",
  content_types: ["PracticeQuestionSet"],
  updatedby: "6e1cef48-aa38-4d53-9f3a-4f73dafd4d88",
  collection_ids: ["do_11305198433242316813067"],
};

exports.mandatoryFieldsNominationAdd = ["program_id", "user_id", "status"]; // ['program_id', 'user_id', 'status', 'createdby']
exports.mandatoryFieldsNominationUpdate = ["program_id", "user_id"]; // ['program_id', 'user_id', 'status', 'updatedby']

exports.preferenceAdd = {
  preference: { medium: ["English"], subject: ["English"] },
  program_id: "",
  type: "sourcing",
  user_id: "cca53828-8111-4d71-9c45-40e569f13bad",
};

exports.preferenceRead = {
  program_id: "",
  user_id: "cca53828-8111-4d71-9c45-40e569f13bad",
};

exports.regOrgSearch = {
  id: "open-saber.registry.search",
  ver: "1.0",
  ets: "11234",
  params: {
    did: "",
    key: "",
    msgid: "",
  },
  request: {
    entityType: ["Org"],
    filters: {
      osid: {
        or: ["4fe5d899-dc3e-48de-b0b6-891e0922d371"],
      },
    },
  },
};

exports.regUserSearch = {
  id: "open-saber.registry.search",
  ver: "1.0",
  ets: "11234",
  params: {
    did: "",
    key: "",
    msgid: "",
  },
  request: {
    entityType: ["User"],
    filters: {
      userId: {
        or: ["f7dab7bc-b9ea-457a-b4d9-7633fbd9736c"],
      },
    },
  },
};

exports.getCollectionWithProgramId = {
  request: {
    filters: {
      programId: "",
      objectType: "content",
      status: ["Draft"],
      contentType: "Textbook",
    },
    fields: [
      "name",
      "medium",
      "gradeLevel",
      "subject",
      "chapterCount",
      "acceptedContents",
      "rejectedContents",
      "openForContribution",
      "chapterCountForContribution",
      "mvcContributions",
    ],
    limit: 1000,
  },
};

exports.resultsGetCollectionWithProgramId = {
  result: {
    content: [
      {
        acceptedContents: [
          "do_11306389208843059216360",
          "do_11306389247965593616362",
          "do_11306390239684198416364",
        ],
        chapterCount: 2,
        identifier: "do_11306389164045926416355",
        medium: "Hindi",
        name: "DP-30",
        objectType: "Content",
        rejectedContents: [
          "do_11306389286445875216363",
          "do_11306390274224947216366",
        ],
        subject: "Hindi",
        openForContribution: true,
        mvcContributions: ["do_123"],
      },
    ],
    count: 1,
  },
};

exports.getSampleContentWithOrgId = {
  request: {
    filters: {
      programId: "",
      objectType: "content",
      status: ["Review", "Draft"],
      sampleContent: true,
    },
    aggregations: [
      {
        l1: "collectionId",
        l2: "organisationId",
      },
    ],
    limit: 0,
  },
};

exports.resultsGetSampleContentWithOrgId = {
  result: {
    count: 3,
    aggregations: [
      {
        values: [
          {
            count: 3,
            name: "do_11306389164045926416355",
            aggregations: [
              {
                values: [
                  {
                    count: 2,
                    name: "4fe5d899-dc3e-48de-b0b6-891e0922d371",
                  },
                ],
                name: "organisationId",
              },
            ],
          },
        ],
        name: "collectionId",
      },
    ],
  },
};

exports.getSampleContentWithCreatedBy = {
  request: {
    filters: {
      programId: "",
      objectType: "content",
      status: ["Review", "Draft"],
      sampleContent: true,
    },
    aggregations: [
      {
        l1: "collectionId",
        l2: "createdBy",
      },
    ],
    limit: 0,
  },
};

exports.resultsGetSampleContentWithCreatedBy = {
  result: {
    count: 3,
    aggregations: [
      {
        values: [
          {
            count: 3,
            name: "do_11306389164045926416355",
            aggregations: [
              {
                values: [
                  {
                    count: 1,
                    name: "f7dab7bc-b9ea-457a-b4d9-7633fbd9736c", // same as nominationAdd user_id
                  },
                  {
                    count: 1,
                    name: "g7dab7bc-b9ea-457a-b4d9-7633fbd9736c",
                  },
                  {
                    count: 1,
                    name: "h7dab7bc-b9ea-457a-b4d9-7633fbd9736c",
                  },
                ],
                name: "createdBy",
              },
            ],
          },
        ],
        name: "collectionId",
      },
    ],
  },
};

exports.resultsGetSampleContentWithOrgId_01 = {
  result: {
    count: 3,
    aggregations: [
      {
        values: [
          {
            count: 3,
            name: "do_11306389164045926416355",
            aggregations: [
              {
                values: [
                  {
                    count: 2,
                    name: "5fe5d899-dc3e-48de-b0b6-891e0922d371", // wrongly modified for test data
                  },
                ],
                name: "organisationId",
              },
            ],
          },
        ],
        name: "collectionId",
      },
    ],
  },
};

exports.getContributionWithProgramId = {
  request: {
    filters: {
      programId: "",
      objectType: "content",
      status: ["Review", "Draft", "Live"],
      contentType: { "!=": "Asset" },
      mimeType: { "!=": "application/vnd.ekstep.content-collection" },
    },
    not_exists: ["sampleContent"],
    aggregations: [
      {
        l1: "collectionId",
        l2: "status",
        l3: "prevStatus",
      },
    ],
    limit: 0,
  },
};

exports.resultGetContributionWithProgramId = {
  result: {
    aggregations: [
      {
        name: "collectionId",
        values: [
          {
            aggregations: [
              {
                name: "status",
                values: [
                  {
                    count: 5,
                    name: "live",
                    aggregations: [
                      {
                        values: [
                          {
                            count: 1,
                            name: "live",
                          },
                          {
                            count: 1,
                            name: "review",
                          },
                        ],
                        name: "prevStatus",
                      },
                    ],
                  },
                  {
                    count: 3,
                    name: "draft",
                    aggregations: [
                      {
                        values: [
                          {
                            count: 1,
                            name: "live",
                          },
                          {
                            count: 1,
                            name: "review",
                          },
                        ],
                        name: "prevStatus",
                      },
                    ],
                  },
                ],
              },
            ],
            count: 8,
            name: "do_11306389164045926416355",
          },
        ],
      },
    ],
    count: 0,
  },
};

exports.searchSampleContents = {
  request: {
    filters: {
      objectType: "content",
      programId: "",
      mimeType: { "!=": "application/vnd.ekstep.content-collection" },
      contentType: { "!=": "Asset" },
      sampleContent: true,
      status: ["Draft", "Review"],
    },
    fields: [
      "name",
      "identifier",
      "programId",
      "mimeType",
      "status",
      "sampleContent",
      "createdBy",
      "organisationId",
      "collectionId",
      "prevStatus",
      "contentType",
    ],
    limit: 10000,
  },
};

exports.resultSearchSampleContents = {
  responseCode: "OK",
  result: {
    count: 2,
    content: [
      {
        identifier: "do_11306546343774617618150",
        createdBy: "4fe5d899-dc3e-48de-b0b6-891e0922d371",
        prevStatus: "Draft",
        name: "Sample01",
        mimeType: "video/mp4",
        contentType: "LearningActivity",
        sampleContent: true,
        collectionId: "do_1130610285558169601677",
        programId: "",
        objectType: "Content",
        status: "Review",
      },
      {
        identifier: "do_11306596636010905618170",
        createdBy: "4fe5d899-dc3e-48de-b0b6-891e0922d371",
        name: "Untitled",
        mimeType: "application/pdf",
        contentType: "PedagogyFlow",
        sampleContent: true,
        collectionId: "do_1130610285558169601677",
        programId: "",
        objectType: "Content",
        status: "Draft",
      },
    ],
  },
};
