import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SignUpService } from 'src/app/home/signup/signup.service';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class UserNotTakenValidatrService{

    constructor(private signUpService: SignUpService){
    }

    //Esta seria a função do validator, mas precisamos criar a classe por conta da injeção de dependencia do service.
    //Tem que retornar a função que seria um validator
    //Validador assincrono que irá retornar um Observable que ao ser acesso pelo fremawork irá retornar o null ou objeto javascript
    checkUserNameTaken(){
       
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(3000))//para não ir no back-end a cada digito
                .pipe(switchMap(userName => {//o switchMap fará parar de escuptar a captura de teclado (fluxo anterior) e vai forca na escuta do back-end (chamada do checkUserNameTaken)
                    return this.signUpService.checkUserNameTaken(userName);
                }))
                .pipe(map(isTaken => isTaken ? {userNameTaken: true } : null))//Faz retornar o null ou o objeto Javascript com o nome do validator com true
                .pipe(first());//Para liberar o valor do subscrible, precisamos forçar a finalização desta emissão. Para isso usamos o first() forçando um complete pegando o primeiro valor da emissão
        }
    }
}