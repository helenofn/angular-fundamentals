import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Photo } from "./photo";

const API = "http://localhost:3000";

@Injectable({providedIn: 'root'})//Para poder ser injetao, root para ser colocado na raiz do projeto e todos os componetes acessaram o mesmo objeto de service
export class PhotoService {

    //Usando o privete, o TS sabe que você quer que http tb seja uma propriedade da classe.
    constructor(private http: HttpClient){}

    listFromUser(userName: string){
        return this.http
        .get<Photo[]>(API + '/flavio/photos');
    }
}