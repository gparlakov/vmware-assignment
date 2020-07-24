import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
    selector: "login-view",
    templateUrl: "login.component.html",
    styleUrls: ["login.component.scss"],
})
export class LoginComponent implements OnInit {
    public formGroup: FormGroup;
    private token: string;

    constructor(private loginService: LoginService, private router: Router) {
        this.formGroup = new FormGroup({
            username: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required),
        });
    }

    ngOnInit() {
        if (this.loginService.getLoggedUser() !== "") {
            this.router.navigateByUrl('repositories');
        }
    }

    logIn(formValue: any) {
        this.token = 'github-token-here';
        localStorage.setItem('user', formValue.username);
        localStorage.setItem('token', this.token);
        this.router.navigateByUrl('repositories');
    }
}
