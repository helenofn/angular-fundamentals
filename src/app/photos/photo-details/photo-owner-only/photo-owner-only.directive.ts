import { Directive, ElementRef, Input, OnInit, Renderer, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { Photo } from '../../photo/photo';

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwenerDirective implements OnInit{
    
    @Input() ownedPhoto: Photo;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer2,
        private userService: UserService
    ){}

    ngOnInit(): void {
        this.userService
            .getUser()
            .subscribe(user => {
                if(!user || user.id!=this.ownedPhoto.userId){
                    //this.renderer.setElementStyle(this.element.nativeElement,'display','none');
                    this.renderer.setStyle(this.element.nativeElement,'display','none');
                }
            })
    }
}