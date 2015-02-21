/// <reference path="../../app.ts" />

module <%= app_namespace %> {

    export class ResponseHelper {

        public static successResponse(data:any, paging?:any):any {

            var data:any = {
                data: data
            };

            if (paging) {
                data['paging'] = paging
            }

            return data;
        }

        public static errorResponse(code:Number, title:String, message:String, description?:String):any {
            var error:any = {
                error: {
                    code: code,
                    title: title,
                    message: message,
                    description: description
                }
            };

            return error

        }

        public static databaseErrorResponse(error:any):any {
            var error:any = {
                error: {
                    code: 4002,
                    title: 'Database Error',
                    message: 'Something went wrong, please try again',
                    description: error
                }
            };

            return error
        }

        public static missingParamsErrorResponse(errors:any):any {
            var error:any = {
                error: {
                    code: 4001,
                    title: 'Missing Parameters Error',
                    message: 'Some of the parameters are missing',
                    description: errors
                }
            };

            return error

        }

    }
}
