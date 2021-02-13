import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, AlertType } from './alert';

@Injectable({providedIn: 'root'})
export class AlertService{

    alertSubjct: Subject<Alert> = new Subject<Alert>();

    success(message: string){
        this.alert(AlertType.SUCCESS, message);
    }

    warning(message: string){
        this.alert(AlertType.WARNING, message);
    }

    danger(message: string){
        this.alert(AlertType.DANGER, message);
    }

    info(message: string){
        this.alert(AlertType.INFO, message);
    }

    private alert(alertType:AlertType, message: string){
        this.alertSubjct.next(new Alert(alertType, message));
    }

    getAlert(){
        return this.alertSubjct.asObservable();
    }
}