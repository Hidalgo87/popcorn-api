import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { ExternalApiService } from 'src/external_api/externalApi.service';

@Module({
  controllers: [DirectorController],
  providers: [DirectorService, ExternalApiService],
})
export class DirectorModule {}
