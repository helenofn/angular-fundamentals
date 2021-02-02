import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy{

    @Output() onTyping = new EventEmitter<string>();
    @Input() value: string = '';
    debounce: Subject<string> = new Subject<string>();

    ngOnInit(): void {
        this.debounce
            .pipe(debounceTime(500))
            .subscribe(filter => this.onTyping.emit(filter));//Cuidado, se não finalizar ele vai ficar enfilerando os eventos e vai consumir muita memória
    }

    ngOnDestroy(): void {
        this.debounce.unsubscribe();//Quando sair da página, desctruir o observable do filter, assim não fica enfilerando sempre.
    }
}