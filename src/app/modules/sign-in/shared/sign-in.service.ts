import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  readonly urlUsers = environment.backend + 'users';

  constructor(public http: HttpClient) {
  }

  login(credentials) {
    return this.http.post(this.urlUsers + '/login', credentials);
  }
}
