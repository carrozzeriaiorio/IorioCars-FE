import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../services/loader.service';

export const LoaderInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const loader = inject(LoaderService); // usa inject() invece del costruttore
  loader.show();
  return next(req).pipe(finalize(() => loader.hide()));
};
