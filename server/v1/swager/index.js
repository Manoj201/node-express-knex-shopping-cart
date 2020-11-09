export default {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Simple Shopping Cart API - V1",
    description: "Simple Shopping cart API written under node express and knex",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  host: "localhost:3000",
  basePath: "/api/v1/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  paths: {
    "/user": {
      get: {
        tags: ["User"],
        summary: "Get all users in system",
        security: [
          {
            Bearer: [],
          },
        ],
        parameters: [
          {
            name: "page",
            in: "query",
            type: "string",
            required: false,
          },
          {
            name: "pageSize",
            in: "query",
            type: "string",
            required: false,
          },
        ],
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/definitions/ResponseObject",
            },
          },
        },
      },
      post: {
        tags: ["User"],
        description: "Create new user in system",
        parameters: [
          {
            name: "user",
            in: "body",
            description: "User that we want to create",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          200: {
            description: "New user is created",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        },
      },
    },
  },
  definitions: {
    User: {
      required: ["id", "userName", "email", "password"],
      properties: {
        id: {
          type: "uuid",
          uniqueItems: true,
        },
        userName: {
          type: "string",
          uniqueItems: true,
        },
        fullName: {
          type: "string",
        },
        email: {
          type: "string",
          uniqueItems: true,
        },
        isMerchant: {
          type: "boolean",
        },
      },
    },
    Users: {
      type: "array",
      items: {
        $ref: "#/definitions/User",
      },
    },

    Meta: {
      type: "object",
      properties: {
        page: {
          type: "number",
        },
        size: {
          type: "number",
        },
        total: {
          type: "number",
        },
        lastPage: {
          type: "number",
        },
      },
    },
    ResponseObject: {
      properties: {
        data: {
          $ref: "#/definitions/Users",
        },
        meta: {
          $ref: "#/definitions/Meta",
        },
      },
    },
  },
};
