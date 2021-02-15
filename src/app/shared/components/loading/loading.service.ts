import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { LoadingType } from './loading-type';

@Injectable({
    providedIn: 'root'
})
export class LoadingService{

    loadingSubjct: Subject<LoadingType> = new Subject<LoadingType>();

    getLoading(){
        return this.loadingSubjct
            .asObservable()
            .pipe(startWith(LoadingType.STOPPED));//Define que a primeira emissão deste observable seja stopped
    }

    start(){
        this.loadingSubjct.next(LoadingType.LOADING);
    }

    stop(){
        this.loadingSubjct.next(LoadingType.STOPPED);
    }


}