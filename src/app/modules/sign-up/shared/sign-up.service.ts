import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  readonly urlUsers = environment.backend + 'users';

  constructor(public http: HttpClient) { }

  signUp(user) {
    return this.http.post(this.urlUsers, user);
  }
}
