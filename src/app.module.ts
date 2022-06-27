import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.model';
// import { FilesModule } from './files/files.module';
import path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TokensModule } from './tokens/tokens.module';
import { Token } from './tokens/tokens.model';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, 'static'),
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'test-backend',
      entities: [User, Token],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    // FilesModule,
    TokensModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
