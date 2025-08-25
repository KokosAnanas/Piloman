import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface IConfig {
    serverProtocol: 'http'
    baseIndexHref: string
    useUserCard: boolean
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    static config: IConfig;

    constructor(
        private http: HttpClient
    ) {
    }

    loadPromise() {
        const jsonFile = `config/config.json`;
        const configPromise = new Promise<IConfig>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: any) => {
                if (response && typeof (response) === 'object') {
                    ConfigService.config = response;
                    const config = ConfigService.config;
                    if (config) {

                        resolve(config);
                    } else {
                        reject('Ошибка при инициализации конфига - неверный формат ' + config);
                    }
                } else {
                    reject('Ошибка при инициализации конфига - неверный формат ответа ' + response);
                }
            }).catch((response: any) => {
                reject(`Ошибка при загрузки файла '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });

        const promiseArr = [configPromise];
        return Promise.all(promiseArr);
    }
}
