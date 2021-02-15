import { FormGroup, ValidatorFn } from '@angular/forms';

export const userNamePassword: ValidatorFn = (formGroup: FormGroup) => {
    const userName = formGroup.get('userName').value;
    const password = formGroup.get('password').value;

    if(userName.trim() + password.trim()) {
        //Quando retorno null é pq não tem erro, quand otem erro eu retorno o objeto javascript com true
        return userName != password ? null : { userNamePassword: true };
    } else {
        return null;
    }
}