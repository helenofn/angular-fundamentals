import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl){

    //Quando der erro
    if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        return { lowerCase: true }
    }

    //quando nao der erro
    return null;
}