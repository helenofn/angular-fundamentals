import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';


@Component({
    selector:'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit{
    
    @Input() photoId: number;
    commentForm: FormGroup;


    comments$: Observable<PhotoComment[]>;
    
    constructor(
        private photoServce: PhotoService,
        private formBuilder: FormBuilder){}

    ngOnInit(): void {
        this.comments$ = this.photoServce.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        });
    }

    save(){
        const comment = this.commentForm.get('comment').value as string;
        /*this.photoServce
            .addComment(this.photoId, comment)
            .subscribe(() => {
                this.comments$ = this.photoServce.getComments(this.photoId);
                this.commentForm.reset();
                alert('Comentário adicionado com sucesso');
            });*/
        this.comments$ = this.photoServce
            .addComment(this.photoId, comment)
            .pipe(switchMap(() => this.comments$ = this.photoServce.getComments(this.photoId)))
            .pipe(tap(() => {
                this.commentForm.reset();
                alert('Comentário adicionado com sucesso');
            }));
    }

}