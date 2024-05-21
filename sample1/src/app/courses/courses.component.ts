//courses.component.ts
import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Role } from '../course';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

interface SignUpResponse {
  data: {
    signUp: {
      id: string;
      first: string;
      last: string;
      email: string;
      phone: string;
      password: string;
      role: Role;
    };
  };
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent {  
  signInVisible: boolean = false;
  signUpVisible: boolean = true;

  showSignInPanel() {
    this.signInVisible = true;
    this.signUpVisible = false;
  }

  showSignUpPanel() {
    this.signInVisible = false;
    this.signUpVisible = true;
  }
  
  // constructor(private http: HttpClient) { }

  // Constructor
  constructor(private userService: UserService) { }

  // Lifecycle hook - OnInit
  ngOnInit(): void {
    // Initialization tasks can go here
  }


  first: string = '';
  last: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  role: Role = Role.WORKER; // Assuming Role is an enum

  newPassword: string = '';
  deleteEmail: string = '';
  updateEmail: string = '';
  getEmail: string = '';
  getPassword: string = '';

  setRoleWorker(): void {
    this.role = Role.WORKER;
  }
  setRoleHirer(): void {
    this.role = Role.HIRER;
  }
  
  getUser() {
    this.userService.getUser(this.email, this.password).subscribe(
      (response) => {
        console.log('User retrieved:', response.data.getUser);
        if (response.data.getUser) {
          // Handle the retrieved user data as needed
        } else {
          console.error('User not found or invalid password');
        }
      },
      (error) => {
        console.error('Error retrieving user:', error);
      }
    );
  }

  signUp() {
    const user = {
      first: this.first,
      last: this.last,
      email: this.email,
      phone: this.phone,
      password: this.password,
      role: 'WORKER' // Assuming a default role for sign-up
    };

    this.userService.signUp(user).subscribe(
      (response) => {
        console.log('User signed up:', response.data.signUp);
        // Optionally, you can reset form fields here
        this.resetFormFields();
      },
      (error) => {
        console.error('Error signing up user:', error);
        // Handle error scenario
      }
    );
  }

  updateUser() {
    this.userService.updateUser(this.email, this.newPassword).subscribe(
      (response) => {
        console.log('User password updated:', response.data.updateUser);
        // Optionally, you can reset form fields here
        this.resetFormFields();
      },
      (error) => {
        console.error('Error updating user password:', error);
        // Handle error scenario
      }
    );
  }

  deleteUser() {
    this.userService.deleteUser(this.deleteEmail).subscribe(
      (response) => {
        console.log('User deleted:', response.data.deleteUser);
        // Optionally, you can reset form fields here
        this.resetFormFields();
      },
      (error) => {
        console.error('Error deleting user:', error);
        // Handle error scenario
      }
    );
  }
  
  resetFormFields() {
    this.first = '';
    this.last = '';
    this.email = '';
    this.phone = '';
    this.password = '';
    this.updateEmail = '';
    this.newPassword = '';
    this.deleteEmail = '';
    this.getEmail = '';
    this.getPassword = '';
  }

}
