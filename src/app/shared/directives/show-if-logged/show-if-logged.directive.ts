import { Directive, ElementRef, Input, OnInit, Renderer, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit{
    
    currentDisplay: string;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer2,
        private userService: UserService
    ){}

    ngOnInit(): void {

        this.currentDisplay = getComputedStyle(this.element.nativeElement).display;//Guarda a propriedade 'diplay' do elemento
        this.userService.getUser().subscribe(user => {
            if(user) {
                this.renderer.setStyle(this.element.nativeElement, 'display', this.currentDisplay);
            }else{
                this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
                this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
            }
        });   

        //Tivemos que fazer a manobra acima, para podermos usar esta diretiva em componentes que não sofrem carregamento (header), mas alguma propriedade deverá ser exibida ou não de acordo com o usuário logado.
        //!this.userService.isLogged() && this.renderer.setStyle(this.element.nativeElement, 'display', 'none'); 
    }
}