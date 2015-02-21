/// <reference path="../../app.ts" />

module <%= app_namespace %> {

    export class UserSchemaHelper {

        public static validateSignUpRequestData(data:any):any {
            var schemajs:any = require('schemajs');

            var rules = {
                name: {
                    type: 'string',
                    filters: ['trim', 'toString'],
                    required: true,
                    error: 'Name is required'
                },
                email: {
                    type: 'email',
                    filters: ['trim', 'toString'],
                    required: true,
                    error: 'Email is required'
                },
                password: {
                    type: 'string',
                    filters: ['trim', 'toString'],
                    required: true,
                    error: 'Password is required'
                },
                service_type: {
                    type: 'string',
                    filters: ['trim', 'toString'],
                    required: true,
                    error: 'Service Type is required [feed_backing, order_taking]'
                }
            };

            return schemajs.create(rules).validate(data);
        }


        public static validateAuthenticationRequestData(data:any):any {

            var rules = {
                email: {
                    type: 'email',
                    filters: ['trim', 'toString'],
                    required: true,
                    error: 'Email is required'
                },
                password: {
                    type: 'string',
                    filters: ['trim', 'toString'],
                    required: true,
                    error: 'Password is required'
                },
                os: {
                    type: 'string',
                    filters: ['trim', 'toString'],
                    required: true,
                    error: 'OS is required'
                },
                hardware: {
                    type: 'string',
                    filters: ['trim', 'toString'],
                    required: false
                },
                reg_id: {
                    type: 'string',
                    filters: ['trim', 'toString'],
                    required: false
                },
                location: {
                    type: 'array',
                    required: false
                }
            };

            var schemajs:any = require('schemajs');
            return schemajs.create(rules).validate(data);
        }

    }
}
