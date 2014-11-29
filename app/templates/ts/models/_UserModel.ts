/// <reference path="../../app.ts" />

module <%= name_space %> {

    export class UserModel extends OX.Model {

        private loggedIn:boolean = false;
        private count:number;

        public constructor(){
            super();
            this.count = 25;
            //OX.Log.info('I am constructor from UserModel');
        }

        public static configure() {
            //OX.Log.info('I am configure from UserModel');
        }

        public getUser(){
            //OX.Log.info('I am counter = ' + this.count);
            //OX.Log.info('User from UserModel');
            var user = {
                name: 'I am Sparky',
                age: 1200,
                location: 'Pluto'
            };

            return user;
        }

        public doLogin() {
            this.count += 30;
            this.loggedIn = true;
        }

        public isLoggedIn() {
            return this.loggedIn;
        }
    }
}
