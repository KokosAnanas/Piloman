import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Notice } from '@/pages/notices/notice/notice';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'notices', component: Notice },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
