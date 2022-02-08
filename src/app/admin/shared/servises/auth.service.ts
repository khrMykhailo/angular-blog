import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { FbAuthResponse, User } from "src/app/shared/interfases";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })

export class AuthService {

    public error$: Subject<string> = new Subject<string>();

    constructor(
        private http: HttpClient
    ) { }

    get token(): string | null {
        const expDate = new Date(localStorage.getItem('fb-token-exp')!)
        if (new Date > expDate) {
            this.logout()

            return null
        }
        return localStorage.getItem('fb-token')
    }

    login(usr: User): Observable<any> {
        usr.returnSecureToken = true
        return this.http.post<FbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, usr)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            )
    }

    logout() {
        this.setToken(null)

    }

    isAutentificated(): boolean {
        return !!this.token
    }

    handleError(err: HttpErrorResponse): any {
        const { message } = err.error.error

        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('Неверный email')
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Неверный пароль')
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Еmail не существует')
                break;

        }

        return throwError(err)
    }

    private setToken(resp: FbAuthResponse | null) {
        if (resp) {
            const expDate = new Date(new Date().getTime() + +resp.expiresIn * 1000)

            localStorage.setItem('fb-token', resp.idToken)
            localStorage.setItem('fb-token-exp', expDate.toString())
        } else {
            localStorage.clear()
        }
    }
}