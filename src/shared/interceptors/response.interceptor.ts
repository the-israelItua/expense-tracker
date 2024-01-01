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
      // console.info(
      //   'Intercepted...',
      //   context.switchToHttp().getResponse(),
      // );
      return next.handle().pipe(
        tap({
          error(err) {
            console.log('Intercepted error...', err);
            return 'err.response';
          },
        }),
        map((data) => {
          return {
            // data:
            ...(typeof data === 'string' ? { message: data } : data),
            statusCode: context.switchToHttp().getResponse().statusCode,
            // message: data.message
          };
        }),
  
        catchError((err) => {
          console.log(err);
          throw err;
        }),
      );
    }
  }
  