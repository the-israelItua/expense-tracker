/*
https://docs.nestjs.com/interceptors#interceptors
*/

import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { catchError, map, tap } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        tap({
          error(err) {
            return 'err.response';
          },
        }),
        map((data) => {
          return {
            // data:
            data,
            statusCode: context.switchToHttp().getResponse().statusCode,
            // message: data.message
          };
        }),
  
        catchError((err) => {
          throw err;
        }),
      );
    }
  }
  