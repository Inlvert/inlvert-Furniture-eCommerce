import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {

  checkHealth(): { status: string; message: string } {
    return {
      status: 'ok',
      message: 'Server is running',
    };
  }
}
