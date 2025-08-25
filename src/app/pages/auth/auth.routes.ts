import { Routes } from '@angular/router';
import { Access } from './access';
import { Error } from './error';
import { Authorization } from '@/pages/auth/authorization/authorization';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'authorization', component: Authorization }
] as Routes;
