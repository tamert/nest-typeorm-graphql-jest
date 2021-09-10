import { Module } from '@nestjs/common';
import { LoggerService } from './loggger.service';

@Module({
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LoggerModule {}
