import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(
        private userService: UserService,
        private router: Router){}

    //Ture tem acesso a rota, false não tem acesso a rota
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        if(!this.userService.isLogged()){
            this.router.navigate([''], //Adicionamos o parametro queryParams, para guardarmos a url que o usuário tentou acessar
                { 
                    queryParams: {
                        fromUrl: state.url
                    }
                }
            );
            return false;
        }

        return true;
    }
}