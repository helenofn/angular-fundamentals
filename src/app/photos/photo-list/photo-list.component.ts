import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Photo } from '../photo/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';

  constructor(
    private activectedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {

    //Foi transferido para o resolver
    /*const userName = this.activectedRoute.snapshot.params.userName;
    this.photoService
      .listFromUser(userName)
      .subscribe(photos => this.photos = photos);*/

      this.photos = this.activectedRoute.snapshot.data.photos;

  }

}
