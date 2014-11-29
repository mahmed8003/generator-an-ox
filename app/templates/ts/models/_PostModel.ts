/// <reference path="../../app.ts" />

module <%= name_space %> {

    export class PostModel extends OX.Model {

        public constructor(){
            super();
            //OX.Log.info('I am constructor from PostModel');
        }

        public static configure() {
            //OX.Log.info('I am configure from PostModel');
        }

        public getPost(){
            //OX.Log.info('Post from PostModel');
            var post = {
                title: 'I am Title',
                description: 'I am a long long long description'
            };

            return post;
        }
    }
}
