import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepperIntl } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserForUpdate } from 'src/app/models/user-for-update';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

import bolumData from './bolumler.json'
import uniData from './universities.json';


export interface Uni {
  name: string;
}

export interface Bolum {
  bolum_name: string;
}

@Component({
  selector: 'app-register-steps',
  templateUrl: './register-steps.component.html',
  styleUrls: ['./register-steps.component.scss']
})
export class RegisterStepsComponent implements OnInit {

  updateState: boolean = false;
  profilePhotoPath: string = "";
  userId: string;

  unies: Uni[] = uniData;
  bolumler: Bolum[] = bolumData;
  filteredOptions: Observable<Uni[]>;
  filteredOptionsBolum: Observable<Bolum[]>;

  name: string = "";

  response: { dbPath: '' };

  isLinear = true;
  formGroup1: FormGroup = new FormGroup({
    university: new FormControl("", Validators.required),
  });

  formGroup2: FormGroup = new FormGroup({
    department: new FormControl("", Validators.required),
  });

  formGroup3: FormGroup = new FormGroup({
    class: new FormControl("", Validators.required),
  });

  formGroup4: FormGroup = new FormGroup({
    introduction: new FormControl("", Validators.required),
  });

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private _matStepperIntl: MatStepperIntl, private authService: AuthService) { }


  ngOnInit() {
    console.log(this.updateState);
    this._matStepperIntl.optionalLabel = "İsteğe Bağlı";

    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.userId = params.userId;

      if (params.isUpdate) {
        this.updateState = params.isUpdate;
      }

      if (!this.userId || this.userId != this.authService.getUserId()) {
        this.router.navigate(["/home"]);
      }

      this.userService.getUser(params.userId).subscribe(res => {
        this.name = res.name;

        if (this.updateState) {
          console.log("gggg");
          this.formGroup1.setValue({ university: res.universityName });
          this.formGroup2.setValue({ department: res.department });
          this.formGroup3.setValue({ class: res.class });
          this.formGroup4.setValue({ introduction: res.introduction });
          this.profilePhotoPath = res.profileImageUrl;
          this.isLinear = false;
        }
      })


    });



    this.filteredOptions = this.formGroup1.get('university').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.filteredOptionsBolum = this.formGroup2.get('department').valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filterBolum(name) : this.bolumler.slice())),
    );

    this.formGroup3.get('class').valueChanges.subscribe(() => {
      if (this.formGroup3.get('class').value > 7 || this.formGroup3.get('class').value < 0)
        this.formGroup3.setValue({
          class: 0
        });
    })
  }

  displayFn(uni: Uni): string {
    return uni && uni.name ? uni.name : '';
  }

  displayFnBolum(bolum: Bolum): string {
    return bolum && bolum.bolum_name ? bolum.bolum_name : '';
  }

  private _filter(name: string): Uni[] {
    const filterValue = name.toLowerCase();

    return this.unies.filter(unies => unies.name.toLowerCase().includes(filterValue));
  }

  private _filterBolum(name: string): Bolum[] {
    const filterValue = name.toLowerCase();

    return this.bolumler.filter(bolumler => bolumler.bolum_name.toLowerCase().includes(filterValue));
  }

  uploadFinished(event: any) {
    this.profilePhotoPath = this.createImgPath(event.dbPath)
  }

  updateUser() {
    var updateUser: UserForUpdate = {
      universityName: this.formGroup1.get('university').value,
      department: this.formGroup2.get('department').value,
      class: this.formGroup3.get('class').value.toString(),
      introduction: this.formGroup4.get('introduction').value,
      profileImageUrl: this.profilePhotoPath,
    }

    console.log(updateUser);
    this.userService.updateUser(this.userId, updateUser).subscribe(res => {
      console.log(res);
      this.router.navigate(["/home"]);
    })
  }

  createImgPath(serverPath: string) {
    var path: string = serverPath;
    var arr = path.split('\\');
    return `https://api.sosyaluniversiteli.tk/resources/images/${arr[2]}`;
  }
}
