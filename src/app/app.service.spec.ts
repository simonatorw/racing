import { TestBed, inject } from '@angular/core/testing';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.get(AppService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the members successful', () => {
    service.getMembers().subscribe((data: any) => {
      expect(data.name).toBe('Joe Member');
    });

    const req = httpMock.expectOne(`http://localhost:8000/api/members`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush({
      name: 'Joe Member'
    });

    httpMock.verify();
  });

  it('should get a member successful', () => {
    service.getMember(1).subscribe((data: any) => {
      expect(data.name).toBe('Joe Member');
    });

    const req = httpMock.expectOne(`http://localhost:8000/api/member?id=1`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush({
      name: 'Joe Member'
    });

    httpMock.verify();
  });

  it('should update a member successful', () => {
    service.updateMember({}).subscribe((data: any) => {
      expect(data.name).toBe('Successful');
    });

    const req = httpMock.expectOne(`http://localhost:8000/api/update`, 'call to api');
    expect(req.request.method).toBe('POST');

    req.flush({
      name: 'Successful'
    });

    httpMock.verify();
  });

  it('should add a member successful', () => {
    service.addMember({}).subscribe((data: any) => {
      expect(data.name).toBe('Successful');
    });

    const req = httpMock.expectOne(`http://localhost:8000/api/add`, 'call to api');
    expect(req.request.method).toBe('POST');

    req.flush({
      name: 'Successful'
    });

    httpMock.verify();
  });

  it('should delete a member successful', () => {
    service.deleteMember({}).subscribe((data: any) => {
      expect(data.name).toBe('Successful');
    });

    const req = httpMock.expectOne(`http://localhost:8000/api/delete`, 'call to api');
    expect(req.request.method).toBe('POST');

    req.flush({
      name: 'Successful'
    });

    httpMock.verify();
  });
});
