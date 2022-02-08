import { Pipe, PipeTransform } from "@angular/core";
import { PostInt } from "src/app/shared/interfases";

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {

    transform(posts: PostInt[], search: string = '') {
        if (!search.trim()) {
            return posts
        }

        return posts.filter(post => {
            return post.title.toLowerCase().includes(search.toLowerCase())
        })
    }

}