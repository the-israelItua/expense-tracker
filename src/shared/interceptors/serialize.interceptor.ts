import {
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    UseInterceptors,
  } from '@nestjs/common';
  import { plainToClass } from 'class-transformer';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  interface ClassConstrutor {
    new (...args: any[]): {};
  }
  
  export function Serialize(dto: ClassConstrutor) {
    return UseInterceptors(new SerializeInterceptor(dto));
  }
  
  export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
      return next.handle().pipe(
        map((data: any) => {
          return plainToClass(this.dto, data, {
            excludeExtraneousValues: true,
          });
        }),
      );
    }
  }
  