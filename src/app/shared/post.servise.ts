import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FbCreateResponse, PostInt } from "./interfases";

@Injectable({ providedIn: 'root' })
export class PostServise {

    constructor(
        private http: HttpClient
    ) { }

    create(post: PostInt): Observable<PostInt> {
        return this.http.post<any>(`${environment.fbDbUrl}/posts.json`, post)
            .pipe(map((resp: FbCreateResponse) => {
                return {
                    ...post,
                    id: resp.name,
                    date: new Date(post.date)
                }
            }))
    }

    getById(id: string): Observable<PostInt> {
        return this.http.get<PostInt>(`${environment.fbDbUrl}/posts/${id}.json`)
            .pipe(map((p: PostInt) => {
                return {
                    ...p,
                    id,
                    date: new Date(p.date)
                }
            }))
    }

    getAll(): Observable<PostInt[]> {
        return this.http.get(`${environment.fbDbUrl}/posts.json`)
            .pipe(
                map((resp: { [key: string]: any }) => {
                    return Object
                        .keys(resp)
                        .map(key => ({
                            ...resp[key],
                            id: key,
                            date: new Date(resp[key].date)
                        }))
                }))
    }

    removeSer(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
    }

    update(post: PostInt): Observable<PostInt> {
        return this.http.patch<PostInt>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
    }

}
