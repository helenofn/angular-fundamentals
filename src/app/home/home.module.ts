import { NgModule } from '@angular/core';
import { SignInComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VMessageComponent } from '../shared/components/vmessage/vmessage.component';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';

@NgModule({
    declarations:[ SignInComponent, SignUpComponent ],
    imports: [
        ReactiveFormsModule, 
        FormsModule,
        CommonModule, 
        VMessageModule,
        RouterModule
    ]
})
export class HomeModule{}