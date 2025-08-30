import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Router, RouterLink } from '@angular/router';
import { IUser, UserService } from '@/pages/service/user.service';
import { MessageService } from 'primeng/api';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-authorization',
    imports: [AppFloatingConfigurator, Button, Checkbox, FormsModule, InputText, Password, NgClass],
    templateUrl: './authorization.html',
    styleUrl: './authorization.scss'
})
export class Authorization implements OnInit, OnDestroy {
    login: string = '';
    password: string = '';
    checked: boolean = false;

    constructor(
        private userService: UserService,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {}

    onAuth(): void {
        const user: IUser = {
            login: this.login,
            password: this.password
        };
        this.userService.authUser(user).subscribe(
            () => {
                this.userService.setUser(user);
                this.router.navigate(['/']);
            },
            () => {
                this.initToast('error', 'Не верный login или password');
            }
        );
    }

    initToast(type: 'error' | 'success', text: string): void {
        this.messageService.add({ severity: type, detail: text, life: 3000 });
    }
}
