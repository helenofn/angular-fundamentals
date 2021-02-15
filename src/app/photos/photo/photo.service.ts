import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Photo } from "./photo";
import { PhotoComment } from './photo-comment';
import { PhotoComponent } from './photo.component';
import { environment } from '../../../environments/environment'

const API = environment.ApiUrl;

@Injectable({providedIn: 'root'})//Para poder ser injetao, root para ser colocado na raiz do projeto e todos os componetes acessaram o mesmo objeto de service
export class PhotoService {

    //Usando o privete, o TS sabe que você quer que http tb seja uma propriedade da classe.
    constructor(private http: HttpClient){}

    listFromUser(userName: string){
        return this.http
        .get<Photo[]>(API + '/'+ userName + '/photos');
    }

    listFromUserPaginated(userName: string, page: number){

        const params = new HttpParams().append('page', page.toString());

        /*return this.http
        .get<Photo[]>(API + '/'+ userName + '/photos?page=' + page);*/

        return this.http
        .get<Photo[]>(API + '/'+ userName + '/photos', { params: params});

    }

    upload(description: string, allowComments: string, file: File){
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);
        return this.http.post(API + '/photos/upload', formData);
    }

    findById(photoId: number){
        return this.http.get<Photo>(API + '/photos/' + photoId);
    }

    getComments(photoId: number){
        return this.http.get<PhotoComment[]>(API + '/photos/' + photoId + '/comments');
    }

    addComment(photoId: number, commentText: string){
        return this.http.post(API + '/photos/' + photoId + '/comments',{commentText: commentText});
    }

    removePhoto(photoId: number){
        return this.http.delete(API + '/photos/' + photoId);
    }

    like(photoId: number){
        return this.http
            .post(API + '/photos/' + photoId + '/like', {}, {observe: 'response'})
            .pipe(map(res => true))//Se não der erro, a resposta será retornada como true
            .pipe(catchError(err => {
                return err.status == '304' ? of(false) : throwError(err);//Caso seja 304 ele retorna o observable do tipo false ("of" cria um observable), caso contrário, continua a propagar o erro.
            }));
    }
}