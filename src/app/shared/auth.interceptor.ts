import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../admin/shared/servises/auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authSer: AuthService,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authSer.isAutentificated()) {
            req: req.clone({
                setParams: {
                    auth: this.authSer.token!
                }
            })
        }

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log('[Interseptor Error:]', error);

                    if (error.status === 401) {
                        this.authSer.logout()
                        this.router.navigate(['/admin', 'login'], {
                            queryParams: {
                                noAuth: true
                            }
                        })
                    }
                    return throwError(error)
                })
            )
    }

}