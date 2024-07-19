import { TestBed } from '@angular/core/testing';

import { RequestRouteInterceptorService } from './interceptor.service';

describe('RequestRouteInterceptorService', () => {
  let service: RequestRouteInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestRouteInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
