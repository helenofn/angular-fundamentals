import { Directive, ElementRef, HostListener, Input, Renderer, Renderer2 } from '@angular/core';

@Directive({
    selector: '[apDarkenOnHover]' //para poder usar da seguinte forma <a apDarkenOnHover></a>, precisamos do [] no selector
})
export class DarkenOnHoverDirective{

    @Input() brightness = '70%';

    //Injeta elemento do DOM
    constructor(
        private el: ElementRef,
        private render: Renderer2
    ){}

    @HostListener('mouseover')
    darkenOn(){
        //this.el.nativeElement.... Poderiamos manipular o DOM com Javascript  normalmente como ja conhecemos
        //Vamos usar o Render para manipular o DOM, a vantagem é que no caso de tudo ser rederizado no servidor, ainda sim vai funcionar.
        this.render.setStyle(this.el.nativeElement,'filter',`brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff(){
        this.render.setStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }
}