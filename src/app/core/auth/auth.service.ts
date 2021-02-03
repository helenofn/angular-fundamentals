import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(userName: string, password: string){

    //{ observe: 'response' } faz com que tenhamos acesso a res.headers, apenas se habilitarmos isto que o post vai deixar acessarmos os headers
    //.pipe permite que executemos coisas antes do subscribe que é executado la no componente signin
    return this.http
      .post(API_URL + '/user/login', {userName: userName, password: password}, { observe: 'response' })
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        console.log(authToken);
      }));
  }
}
