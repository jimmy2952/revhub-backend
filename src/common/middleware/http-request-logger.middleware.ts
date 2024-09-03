import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import * as morgan from 'morgan'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class HttpRequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HttpRequestLoggerMiddleware.name)

  use(req: Request, res: Response, next: NextFunction) {
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
      stream: {
        write: (message) => this.logger.log(message),
      },
    })(req, res, next)

    /**
     * Custom format
     */
    // morgan(function (tokens, req, res) {
    //   return [
    //     tokens.date(req, res, 'iso'),
    //     tokens.method(req, res),
    //     tokens.url(req, res),
    //     tokens.status(req, res),
    //     tokens.res(req, res, 'content-length'),
    //     '-',
    //     tokens['response-time'](req, res),
    //     'ms',
    //   ].join(' ')
    // })(req, res, next)
  }
}
