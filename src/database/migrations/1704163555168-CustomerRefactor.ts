import { MigrationInterface, QueryRunner } from 'typeorm';

export class CustomerRefactor1704163555168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE customers DROP COLUMN bod;
        ALTER TABLE customers DROP COLUMN gender;
        ALTER TABLE customers DROP COLUMN phone_number;

        ALTER TABLE customers ADD COLUMN name VARCHAR;
        UPDATE customers SET name = CONCAT(first_name, last_name);
        ALTER TABLE customers ALTER COLUMN name SET NOT NULL;

        ALTER TABLE customers DROP COLUMN first_name;
        ALTER TABLE customers DROP COLUMN last_name;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE customers ADD COLUMN bod DATE;
        ALTER TABLE customers ADD COLUMN gender gender_type_enum;
        ALTER TABLE customers ADD COLUMN phone_number VARCHAR;

        ALTER TABLE customers ADD COLUMN first_name VARCHAR;
        ALTER TABLE customers ADD COLUMN last_name VARCHAR;

        UPDATE customers SET
        first_name = regexp_replace(name, '(^.*) .*', '\\1'),
        last_name = regexp_replace(name, '^.* ', '');

        ALTER TABLE customers DROP COLUMN name;
    `);
  }
}
