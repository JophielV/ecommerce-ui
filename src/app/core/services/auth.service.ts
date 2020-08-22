import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NgxPermissionsService} from 'ngx-permissions';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

export interface Credentials {
  username?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private permissionsService: NgxPermissionsService) {
  }

  public login(form): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');

    let params = new HttpParams();
    params = params.append('username', encodeURIComponent(form.username));
    params = params.append('password', encodeURIComponent(form.password));

    return this.httpClient.post<any>(`${environment.apiUrl}/login`, decodeURIComponent(params.toString()), {headers});
  }

  public getLoggedInUser(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/user/me`);
  }

  public isAuthenticated(): boolean {
    return !!this.credentials;
  }

  public get credentials(): Credentials | null {
    return JSON.parse(localStorage.getItem('credentials'));
  }

  public setCredentials(credentials?: Credentials) {
    localStorage.setItem('credentials', JSON.stringify(credentials));
  }

  public logout(): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/logout`, null)
      .pipe(tap((response: any) => {
        this.permissionsService.flushPermissions();
        localStorage.clear();
        return response;
      }));
  }

}

