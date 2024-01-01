import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';

@Catch() // Filter not working!!
export class AllExceptionFilter implements ExceptionFilter {
  catch(_exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (request['headers']['content-type'] !== 'application/json') {
      if (_exception['statusCode'] && _exception['statusCode'] === 404) {
        response.redirect('404');
        return;
      }
      response.redirect('500');
      return;
    }
    response
      .status(_exception?.getStatus?.() || 500)
      .json(_exception?.getResponse?.());
  }
}
