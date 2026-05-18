import swaggerJsdoc from "swagger-jsdoc";

const options = {

    definition: {
        openapi: "3.0.0",

        info: {
            title: "Product Order Management API",
            version: "1.0.0",
            description:
                "Backend assignment API documentation"
        },

        servers: [
            {
                url: "http://localhost:8000"
            }
        ],

        components: {
            securitySchemes: {

                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }

            },
            schemas: {

                Product:{
                    type:"object",
                    properties:{
                        name:{ type:"string" },
                        quantity:{ type:"number" },
                        price:{ type:"number" }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: ["./routes/*.js"]

};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

