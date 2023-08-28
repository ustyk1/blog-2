import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`http://localhost:5000/post`, post)
      .pipe(
        map((response: any) => {
          return {
            ...post,
            id: response.name
          }
        }))
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:5000/post`);
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`http://localhost:5000/post/${id}`)
      .pipe(map((post: Post) => {
        return {
          ...post, id
        }
      }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:5000/post/${id}`)
  }

  update(id: string, post: Post): Observable<Post> {
    return this.http.patch<Post>(`http://localhost:5000/post/${id}`, post)
  }
}
