import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { register } from './metrics';

@Controller({ path: 'metrics', version: ['2'] })
export class MetricsController {
  @Get('/')
  async getMetrics(@Res() res: Response) {
    res.set('Content-Type', register.contentType);
    res.send(await register.metrics());
  }
}
