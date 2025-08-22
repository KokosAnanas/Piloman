import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import { API } from '@/shared/api';

export interface INotice {
    orgName:    string;
    noticeNum:  string;
    noticeDate: string | Date;
    toWhom:     string;
    copyTo:     string;
    specialist: string;
    present?:    string;
    objectName: string;
    workType:   string;
    violations: INoticeViolation[];
    actions:    string;
    contacts?:   string;
    photos: string[];
}

export interface INoticeViolation {
    place: string;
    element: string;
    subject: string;
    norm: string;
    deadline: string | Date;
    note?: string | null;
}

export type INoticeFormGroup = {
    orgName:     FormControl<string>;
    noticeNum:   FormControl<string>;
    noticeDate:  FormControl<string | Date>;
    toWhom:      FormControl<string>;
    copyTo:      FormControl<string>;
    specialist:  FormControl<string>;
    present:     FormControl<string>;
    objectName:  FormControl<string>;
    workType:    FormControl<string>;
    violations:  FormArray<FormGroup<INoticeViolationForm>>;
    actions:     FormControl<string>;
    contacts:    FormControl<string>;
    photos:      FormControl<string[]>;
};

export type INoticeViolationForm = {
    place: FormControl<string>;
    element: FormControl<string>;
    subject: FormControl<string>;
    norm: FormControl<string>;
    deadline: FormControl<string | Date>;
    note: FormControl<string>;
};

export interface CreateNoticeDto extends Omit<INotice, 'violations'|'noticeDate'|'photos'> {
    noticeDate: string;
    violations: INoticeViolation[];
    photos: string[];
}

@Injectable({ providedIn: 'root' })
export class NoticeService {
    private http = inject(HttpClient);

    /** POST /api/notices */
    create(dto: FormData): Promise<void> {
        return firstValueFrom(this.http.post<void>(API.notices, dto));
    }
    getNotices(): Observable<INotice[]> {
        // Выполняем GET-запрос к бэкенду
        return this.http.get<INotice[]>(API.notices, {
        });
    }

    /** DELETE /api/notices/:noticeNum */
    deleteNotice(noticeNum: string): Observable<void> {
        const encoded = encodeURIComponent(noticeNum);
        return this.http.delete<void>(`${API.notices}/${encoded}`);
    }

    /** PUT /api/notices/:noticeNum */
    updateNotice(noticeNum: string, dto: FormData): Promise<void> {
        const encoded = encodeURIComponent(noticeNum);
        return firstValueFrom(this.http.put<void>(`${API.notices}/${encoded}`, dto));
    }
}

