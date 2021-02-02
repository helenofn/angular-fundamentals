import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';
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
  }


  load(){
    this.photoService
      .listFromUserPaginated(this.userName, this.currentPage++)
      .subscribe(photos => {
        //this.photos.push(...photos);//Para cada item de foto ele vai desmembrar os dados // O porblema é que o componente de exinição não vai entender que a lista de photos foi alterada
        this.filter='';
        this.photos = this.photos.concat(photos);// O concat gera uma nova lista, é uma nova referencia e o mecanismo de change detection do Angular vai funcionar.
        if(!photos.length){
          this.hasMore = false;
        }
      });
  }

}
