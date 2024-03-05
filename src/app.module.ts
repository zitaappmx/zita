import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { validateConfig } from './config/configuration-valitation';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: 'src/config/credentials.env',
      isGlobal: true,
      validate: validateConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: await configService.get('database.host'),
        username: await configService.get('database.username'),
        password: await configService.get('database.password'),
        database: await configService.get('database.name'),
        entities: [],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
