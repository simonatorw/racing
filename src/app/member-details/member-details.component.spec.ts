import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import {Location} from '@angular/common';
import {
  ActivatedRouteStub
} from './activated-route-stub';

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.setParamMap({ id: 99999 });
  });

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        HttpClient,
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        },
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
