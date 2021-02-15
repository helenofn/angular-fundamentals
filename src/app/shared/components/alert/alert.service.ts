import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Alert, AlertType } from './alert';

@Injectable({providedIn: 'root'})
export class AlertService{

    alertSubjct: Subject<Alert> = new Subject<Alert>();
    keepAfterRouteChange = false;

    constructor(router: Router){
        router.events.subscribe(event =>{
            if(event instanceof NavigationStart){
                if(this.keepAfterRouteChange){
                    this.keepAfterRouteChange = false;
                }else{
                    this.clear();
                }
            }
        });
    }

    success(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
    }

    warning(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.WARNING, message, keepAfterRouteChange);
    }

    danger(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.DANGER, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.INFO, message, keepAfterRouteChange);
    }

    private alert(alertType:AlertType, message: string, keepAfterRouteChange: boolean){
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alertSubjct.next(new Alert(alertType, message));
    }

    getAlert(){
        return this.alertSubjct.asObservable();
    }

    clear(){
        this.alertSubjct.next(null);
    }
}