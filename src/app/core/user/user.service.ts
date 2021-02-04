import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TokenService } from '../token/token.service';
import { User } from './user';
import * as jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class UserService{

    //private userSubject = new Subject<User>(); // No nosso cenário da problema no subject, pois este serviço é carregado antes da renderização da navbar, ou seja, quando a navbar é carregada, o subject já foi passado.
    private userSubject = new BehaviorSubject<User>(null);//O behavior emit o valorigual ao subject, mas se ninguem ouviu, ele guarda para quando alguem se inscrever
    private userName: string;

    constructor(private tokenService: TokenService){
        this.tokenService.hasToken() && this.decodAndNotify();
    }

    setToken(token: string){
        this.tokenService.setToken(token);
        this.decodAndNotify();
    }

    getUser(){
        return this.userSubject.asObservable();//O objeto que pegar deverá realizar o subscribe
    }

    private decodAndNotify(){
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as User;
        this.userName = user.name;
        this.userSubject.next(user);
    }

    logout(){
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged(){
        return this.tokenService.hasToken();
    }

    getUserName(){
        return this.userName;
    }

}