import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { validateConfig } from './config/configuration-valitation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantsModule } from './merchants/merchants.module';
import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { AppointmentsModule } from './appointments/appointments.module';
import { ServicesModule } from './services/services.module';
import { Merchant } from './merchants/entities/merchant.entity';
import { Appointment } from './appointments/entities/appointment.entity';
import { Service } from './services/entities/service.entity';
import { EmployeesModule } from './employees/employees.module';
import { ClientModule } from './client/client.module';
import { Client } from './client/entities/client.entity';
import { Employee } from './employees/entities/employee.entity';

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
        entities: [Merchant, Appointment, Service, Client, Employee],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
      }),
    }),
    CognitoAuthModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        jwtVerifier: {
          userPoolId: await configService.get('cognito.userPoolId'),
          clientId: await configService.get('cognito.userPoolClientId'),
          tokenUse: 'access',
        },
      }),
    }),
    MerchantsModule,
    AppointmentsModule,
    ServicesModule,
    EmployeesModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
