import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from './new-user';
import { environment } from '../../../environments/environment'

const API = environment.ApiUrl;

@Injectable()
export class SignUpService{

    constructor(private httpClient: HttpClient){}

    checkUserNameTaken(userName: string){
        return this.httpClient.get(API + '/user/exists/' + userName);
    }

    signup(newUser: NewUser){
        return this.httpClient.post(API + '/user/signup', newUser);
    }
}