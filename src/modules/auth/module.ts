import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './service';
import { AuthResolver } from './resolver';
import { Authorization } from './guard/auth.guard';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'AQEJNFNFNNFNSSMSMM123445775566@@££%%$£DG!',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    AuthResolver,
    Authorization,
    ConfigService,
  ],
  exports: [AuthService, Authorization],
})
export class AuthModule {}
