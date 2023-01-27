export const jsonSchemaCreateCompany = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  properties: {
    message: {
      type: "string",
    },
    user: {
      type: "object",
    },
    newCompany: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        desc: {
          type: "string",
        },
        admins: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              fullName: {
                type: "string",
              },
            },
            minItems: 2,
          },
        },
        workloadCapacityDefault: {
          type: "object",
          properties: {
            value: {
              type: "integer",
            },
          },
        },
        teams: {
          type: "array",
          minItems: 1,
        },
      },
    },
  },
  additionalProperties: true,
  required: ["message", "user", "newCompany"],
};
