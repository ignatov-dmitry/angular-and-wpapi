import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Page, Post} from "../classes";

@Injectable()

export class PostService {
    public base_url = 'https://testwp.loc/wp-json/wp/';
    private auth = "Basic " + btoa( 'admin:jgjD 4VJS BMvs M8P3 79iX kL6N' );
    private headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": this.auth
    });

    constructor(private http: HttpClient) {}


    getById(id: number): Observable<Post> {
      return this.http.get<Post>(this.base_url + 'v2/posts/' + id).pipe(
        map((post:any) => {
          post.title = post.title.rendered;
          post.content = post.content.rendered;
          return post
        })
      );
    }

    getPosts(): Observable<Post[]> {
      return this.http.get<Post[]>(this.base_url + 'v2/posts').pipe(
        map((data:any) => {
          return data.map(function (post: any): Post {
            post.title = post.title.rendered;
            return post
          })
        })
      );
      // return this.http.get(this.base_url + 'v2/posts').pipe(
      //   map((data:any) => {
      //     return data.map(function (post: any): Post {
      //       post.title = post.title.rendered;
      //       return post
      //     })
      //   })
      // );
    }

    createPost(post: any) {
      post.status = 'publish'
      return this.http.post<Post>(this.base_url + 'v2/posts', JSON.stringify(post), {headers: this.headers});

    }

    updatePost(id: number, post?: any) {
      return this.http.put<Post>(this.base_url + 'v2/posts/' + id, JSON.stringify(post), {headers: this.headers});
    }

    deletePost(post: Post){
      return this.http.delete<Post>(this.base_url + 'v2/posts/' + post.id, {headers: this.headers});
    }




    getPages(): Observable<Post[]> {
      return this.http.get(this.base_url + 'v2/posts').pipe(
        map((data:any) => {
          return data.map(function (page: any): Page {
            return new Page(page.id, page.title.rendered, page.content, page.slug)
          })
        })
      );
    }


    get(url: string) {
        return this.http.get(url);
    }
}
