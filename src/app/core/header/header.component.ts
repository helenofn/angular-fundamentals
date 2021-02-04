import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

    user$: Observable<User>; //Por padrão, paratodo observable colocamos $ no final da variável
    //user: User;

    constructor(private userService: UserService, private router: Router){
        this.user$ = userService.getUser();
        //this.user$.subscribe(user => this.user = user); Alteramos para obter o observable diretamente do template, quando fazemos isso, o próprio Angularrealiza o destroy do observable
    }

    logout(){
        this.userService.logout();
        this.router.navigate(['']);
    }
}