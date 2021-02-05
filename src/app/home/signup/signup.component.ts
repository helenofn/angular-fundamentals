import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatrService } from 'src/app/shared/validators/user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [UserNotTakenValidatrService]
})
export class SignUpComponent implements OnInit{

    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatrService,
        private signUpService: SignUpService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService){}

    ngOnInit(): void {
        const fn = 
        this.signupForm = this.formBuilder.group({
            //Estrutura para colocar os validadores: parm 1: valor padrão, parm2:  array de validadores sincronos, parm3: array de validadores assincronos.
            email: ['', [Validators.required, Validators.email]],
            fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
            userName: ['', [Validators.required, /*Validators.pattern(/^[a-z0-9_\-]+$/)*/lowerCaseValidator, Validators.minLength(2), Validators.maxLength(30)], this.userNotTakenValidatorService.checkUserNameTaken()],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]]
        });
        this.platformDetectorService.isPlatformBrowser() && this.emailInput.nativeElement.focus();
    }

    signup(){
        const newUser = this.signupForm.getRawValue() as NewUser;
        this.signUpService
            .signup(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                err => console.log(err)
            );
    }

}