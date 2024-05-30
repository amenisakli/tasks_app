import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  sign_up(user: any) {
    return this.http.post(environment.api + 'user', user);
  }
  sign_in(user: any) {
    return this.http.post(environment.api + 'auth', user);
  }
  tokenGetter() {
    var name = 'authToken=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
  deleteCookie(name: string) {
    document.cookie =
      name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
