import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Notice } from '@/pages/notices/notice/notice';
import { Registry } from '@/pages/registry/registry';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'notice', component: Notice },
    { path: 'registry', component: Registry },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
