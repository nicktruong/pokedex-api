import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdminRefactor1704170830044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE admins DROP COLUMN bod;
        ALTER TABLE admins DROP COLUMN gender;
        ALTER TABLE admins DROP COLUMN phone_number;

        ALTER TABLE admins ADD COLUMN name VARCHAR;
        UPDATE admins SET name = CONCAT(first_name, last_name);
        ALTER TABLE admins ALTER COLUMN name SET NOT NULL;

        ALTER TABLE admins DROP COLUMN first_name;
        ALTER TABLE admins DROP COLUMN last_name;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE admins ADD COLUMN bod DATE;
        ALTER TABLE admins ADD COLUMN gender gender_type_enum;
        ALTER TABLE admins ADD COLUMN phone_number VARCHAR;

        ALTER TABLE admins ADD COLUMN first_name VARCHAR;
        ALTER TABLE admins ADD COLUMN last_name VARCHAR;

        UPDATE admins SET
        first_name = regexp_replace(name, '(^.*) .*', '\\1'),
        last_name = regexp_replace(name, '^.* ', '');

        ALTER TABLE admins DROP COLUMN name;
    `);
  }
}
