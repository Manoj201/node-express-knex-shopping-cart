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
    "/login": {
      post: {
        tags: ["Authenticate"],
        summary: "Generate jwt token for bearer token",
        parameters: [
          {
            name: "credentials",
            in: "body",
            description: "credentials object to login",
            schema: {
              $ref: "#/definitions/Credential",
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
    "/user": {
      post: {
        tags: ["User"],
        summary: "Create User",
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
              $ref: "#/definitions/User",
            },
          },
        },
      },
    },
    "/user/{userId}": {
      get: {
        tags: ["User"],
        summary: "Get User List with Pagination",
        security: [
          {
            Bearer: [],
          },
        ],
        parameters: [
          {
            name: "userId",
            in: "path",
            type: "string",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/definitions/UserGetObject",
            },
          },
        },
      },
    },
  },
  definitions: {
    Credential: {
      required: ["userName", "password"],
      properties: {
        userName: {
          type: "string",
          uniqueItems: true,
        },
        password: {
          type: "string",
          uniqueItems: true,
        },
      },
    },
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
    UserGetObject: {
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
        merchants: {
          type: "array",
          items: {
            $ref: "#/definitions/Merchant",
          },
        },
      },
    },
    Users: {
      type: "array",
      items: {
        $ref: "#/definitions/User",
      },
    },
    Merchant: {
      required: ["id", "merchantName", "userId"],
      properties: {
        id: {
          type: "uuid",
          uniqueItems: true,
        },
        countryCode: {
          type: "string",
        },
        merchantName: {
          type: "string",
          uniqueItems: true,
        },
        userId: {
          type: "uuid",
        },
        status: {
          type: "boolean",
        },
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
