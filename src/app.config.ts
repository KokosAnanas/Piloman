import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { ConfigService } from '@/pages/service/config.service';
import { AuthInterceptor } from '@/pages/service/auth-interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

const loadConfig = (cfg: ConfigService) => () => cfg.loadPromise();


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes,
            withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
            withEnabledBlockingInitialNavigation()),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } },
            translation: {
                dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
                    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                clear: 'Очистить',
                today: 'Текущая дата',
                accept: 'Да',
                reject: 'Отмена',
            }}),
        {
            provide: APP_INITIALIZER,
            useFactory: loadConfig,
            deps: [ConfigService],
            multi: true
        },

        importProvidersFrom(ReactiveFormsModule, ToastModule),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideAnimations(),
        MessageService,
        DatePipe,
        {
            provide: APP_INITIALIZER,
            useFactory: loadConfig,
            deps: [ConfigService],
            multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
};
