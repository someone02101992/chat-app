import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  createUserForm: FormGroup;
  isNewUser = false;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    // private _db: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    const buildGroup = () => {
      return this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    };

    const newUserBuildGroup = () => {
      return this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        username: ['', [Validators.required]]
      });
    };

    this.loginForm = buildGroup();

    this.createUserForm = newUserBuildGroup();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onLoginSubmitButtonClick({ value, valid }: { value: any; valid: boolean }) {
    if (this.loginForm.valid) {
      console.log('LoggingIn');
      this.authService.login(value.email, value.password).then(user => {
        console.log(user);
        this.router.navigate(['../home']);
      });
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }

  onCreateUserSubmitButtonClick({ value, valid }: { value: any, valid: boolean }) {
    if (!this.createUserForm.valid) {
      return this.validateAllFormFields(this.createUserForm);
    }

    return this.authService.createUser(value.email, value.password);
    // if (this.createUserForm.valid) {
    //   this.authService.createUser(value.email, value.password).then(user => {
    //     // const usersRef = this.firestore.collection('/users');
    //     const userRef = this.firestore.doc('users/' + user.user.uid)
    //     const userData = {
    //       email: user.user.email,
    //       photoURL: '',
    //       username: value.username
    //     };
    //     userRef.update(userData).then(() => this.router.navigate(['/home']));
    //   });
    // } else {
    //   this.validateAllFormFields(this.createUserForm);
    // }
  }

  logout() {
    this.auth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
