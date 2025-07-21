import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './User/auth/auth.module'; 
import { OrganizerModule } from './Organizer/organizer.module';
import { CommunityModule } from './Community/help.module';


@Module({
  imports: [
    UserModule,
    OrganizerModule,
    CommunityModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    
      // 🔐 Add this block to enable SSL
      ssl: {
        rejectUnauthorized: false,
      },
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    })
    , AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}