import { defineConfig } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';

export default defineConfig({
  driver: SqliteDriver,
  dbName: ':memory:', // 메모리 모드
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  // 스키마 자동 생성 (개발 환경용)
  schemaGenerator: {
    createForeignKeyConstraints: true,
    disableForeignKeys: false,
  },
});
