import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { HttpClientModule } from '@angular/common/http';

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created', inject([AuthService], (service: AuthService) => {
    localStorage.removeItem('username');
    expect(service.isLoggedIn()).toBeFalsy();
  }));

  it('should be created', inject([AuthService], (service: AuthService) => {
    localStorage.username = 'doh';
    expect(service.isLoggedIn()).toBeTruthy();
  }));
});
