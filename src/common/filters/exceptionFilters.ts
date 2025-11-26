import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  public catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // log.error(exception);

    // if (exception instanceof DSPError) {
    //   log.info(`${exception.stack}: logParams - ${JSON.stringify(exception.logParams)}`);

    //   const responseBody = {
    //     ...exception.toJSON(),
    //     path: request.url,
    //   };

    //   response.status(exception.status).json(responseBody);
    if (exception instanceof HttpException) {
      // log.info('HttpException');
      // log.info(`${exception.stack}`);
      const status = exception.getStatus();
      const res = exception.getResponse();
      response.status(status).json(res);
    } else {
      // log.info('RawError');
      response.status(400).json(new BadRequestException(exception.message).getResponse());
    }
  }
}
