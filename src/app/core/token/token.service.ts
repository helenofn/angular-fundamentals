import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({ providedIn: 'root'})
export class TockenService{

    hasToken(){
        return !!this.getToken();//o !! é para fazer retornar o boleano
    }

    setToken(token){
        window.localStorage.setItem(KEY, token);
    }

    getToken(){
        return window.localStorage.getItem(KEY);
    }

    removeTOken(){
        window.localStorage.removeItem(KEY);
    }
}