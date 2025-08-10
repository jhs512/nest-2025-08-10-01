import { MikroORM } from '@mikro-orm/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { User } from './users/user.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // MikroORM 인스턴스 가져오기
  const orm = app.get(MikroORM);
  
  // 데이터베이스 연결 및 스키마 생성
  await orm.getSchemaGenerator().ensureDatabase();
  await orm.getSchemaGenerator().createSchema();
  
  // 샘플 데이터 생성
  const em = orm.em.fork();
  
  // 기존 사용자 데이터가 있는지 확인
  const existingUsers = await em.count(User);
  if (existingUsers === 0) {
    // 샘플 사용자 데이터 생성
    const users = [
      { name: '홍길동', email: 'hong@example.com' },
      { name: '김철수', email: 'kim@example.com' },
    ];

    for (const userData of users) {
      const user = em.create(User, userData);
      em.persist(user);
    }

    await em.flush();
    console.log('✅ 샘플 사용자 데이터 2개가 생성되었습니다!');
  }
  
  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 애플리케이션이 시작되었습니다!');
}
bootstrap();
