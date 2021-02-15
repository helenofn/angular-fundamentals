import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(
    private router: Router, // Me da acesso ao evento disparado sobre a rota
    private activateRoute: ActivatedRoute, // Me da acesso a informação que está na rota
    private titleService: Title
  ){}

  ngOnInit(): void {
    
    //Para cada rota acessada, com oescopo de página, altera para o title da página pelo title informado em "data" na própria rota
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activateRoute))
      .pipe(map(route => {
        while(route.firstChild) route = route.firstChild;//Necessário para pegar apenas a rota pai
        return route;
      }))
      .pipe(switchMap(route => route.data))
      .subscribe(event => this.titleService.setTitle(event.title));
  }

}
