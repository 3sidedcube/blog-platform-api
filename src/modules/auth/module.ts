import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './service';
import { AuthResolver } from './resolver';
import { Authorization } from './guard/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=>({
      secret: configService.get<string>('JWT_KEY'),
      signOptions: { expiresIn: '1h' },
    }),
}),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    AuthResolver,
    Authorization,
    ConfigService
  ],
  exports: [AuthService, Authorization,JwtModule, ConfigService],
})
export class AuthModule {}
