import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: 'UP',
      release: 'canary',
      version: '4.0.0',
      deploymentDate: '2026-06-03',
    };
  }
}
