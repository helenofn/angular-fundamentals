import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activectedRoute: ActivatedRoute,
    private photoService: PhotoService
  ){}
  
  ngOnInit(): void {
    this.userName = this.activectedRoute.snapshot.params.userName;
    
    //Foi transferido para o resolver
    /*const userName = this.activectedRoute.snapshot.params.userName;
    this.photoService
      .listFromUser(userName)
      .subscribe(photos => this.photos = photos);*/

      this.photos = this.activectedRoute.snapshot.data.photos;

      this.debounce
        .pipe(debounceTime(500))
        .subscribe(filter => this.filter = filter);//Cuidado, se não finalizar ele vai ficar enfilerando os eventos e vai consumir muita memória

  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();//Quando sair da página, desctruir o observable do filter, assim não fica enfilerando sempre.
  }

  load(){
    this.photoService
      .listFromUserPaginated(this.userName, this.currentPage++)
      .subscribe(photos => {
        //this.photos.push(...photos);//Para cada item de foto ele vai desmembrar os dados // O porblema é que o componente de exinição não vai entender que a lista de photos foi alterada
        this.photos = this.photos.concat(photos);// O concat gera uma nova lista, é uma nova referencia e o mecanismo de change detection do Angular vai funcionar.
        if(!photos.length){
          this.hasMore = false;
        }
      });
  }

}
