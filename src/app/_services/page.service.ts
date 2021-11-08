import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Page} from "../classes";

@Injectable()

export class PageService {
  public base_url = 'https://testwp.loc/wp-json/wp/';
  private auth = "Basic " + btoa( 'admin:jgjD 4VJS BMvs M8P3 79iX kL6N' );
  private headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.auth
  });

  constructor(private http: HttpClient) {}


  getById(id: number): Observable<Page> {
    return this.http.get<Page>(this.base_url + 'v2/pages/' + id).pipe(
      map((page:any) => {
        page.title = page.title.rendered;
        page.content = page.content.rendered;
        return page
      })
    );
  }

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(this.base_url + 'v2/pages').pipe(
      map((data:any) => {
        return data.map(function (page: any): Page {
          page.title = page.title.rendered;
          return page
        })
      })
    );
  }

  createPage(page: any) {
    page.status = 'publish'
    return this.http.post<Page>(this.base_url + 'v2/pages', JSON.stringify(page), {headers: this.headers});

  }

  updatePage(id: number, page?: any) {
    return this.http.put<Page>(this.base_url + 'v2/pages/' + id, JSON.stringify(page), {headers: this.headers});
  }

  deletePage(page: Page){
    return this.http.delete<Page>(this.base_url + 'v2/pages/' + page.id, {headers: this.headers});
  }

}
