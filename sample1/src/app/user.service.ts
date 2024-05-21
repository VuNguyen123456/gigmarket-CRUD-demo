import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signUp(user: any): Observable<any> {
    const signUpMutation = `
      mutation SignUp($input: SignUpInput!) {
        signUp(input: $input) {
          id
          first
          last
          email
          phone
          password
          role
        }
      }
    `;
    return this.http.post<any>('http://localhost:5000/graphql', { query: signUpMutation, variables: { input: user } });
  }

  updateUser(email: string, password: string): Observable<any> {
    const updateUserMutation = `
      mutation UpdateUser($email: String!, $password: String!) {
        updateUser(email: $email, password: $password) {
          id
          first
          last
          email
          phone
          password
        }
      }
    `;
    return this.http.post<any>('http://localhost:5000/graphql', { query: updateUserMutation, variables: { email: email, password: password } });
  }
  
  deleteUser(email: string): Observable<any> {
    const deleteUserMutation = `
      mutation DeleteUser($email: String!) {
        deleteUser(email: $email)
      }
    `;
    return this.http.post<any>('http://localhost:5000/graphql', { query: deleteUserMutation, variables: { email: email } });
  }

  getUser(email: string, password: string): Observable<any> {
    const getUserQuery = `
      query GetUser($email: String!, $password: String!) {
        getUser(email: $email, password: $password) {
          id
          first
          last
          email
          phone
          password
        }
      }
    `;
    return this.http.post<any>('http://localhost:5000/graphql', { query: getUserQuery, variables: { email, password } });
  }
}