import { NgModule } from '@angular/core';

import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form-module';
import { PhotoListModule } from './photo-list/photo-list.module';



@NgModule({
    /* Depois de ter organizado em submodulos, passamos a importar apenas os submodulos ao inves de todos os componentes
    declarations:[ 
        PhotoComponent, 
        PhotoListComponent, 
        PhotoFormComponent, 
        PhotosComponent,
        FilterByDescription,
        LoadButtonComponent 
    ],*/
    imports: [ 
        PhotoModule,
        PhotoFormModule,
        PhotoListModule,
        /*HttpClientModule, -- Depois de termos organizado em sub-modulos, cada módulo ou submódulo importa o que precisa
        CommonModule*/
     ]
})
export class PhotosModule{


}