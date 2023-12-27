import { MigrationInterface, QueryRunner } from 'typeorm';

export class TokenUserRoleDefault1703653134924 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tokensTable = await queryRunner.getTable('tokens');
    const userRoleColumn = tokensTable.findColumnByName('user_role');

    const changedUserRoleColumn = userRoleColumn.clone();
    changedUserRoleColumn.default = `'CUSTOMER'::customer_user_role_enum`;

    await queryRunner.changeColumn(
      tokensTable,
      userRoleColumn,
      changedUserRoleColumn,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tokensTable = await queryRunner.getTable('tokens');
    const userRoleColumn = tokensTable.findColumnByName('user_role');

    const changedUserRoleColumn = userRoleColumn.clone();
    changedUserRoleColumn.default = `'0'::customer_user_role_enum`;

    await queryRunner.changeColumn(
      tokensTable,
      userRoleColumn,
      changedUserRoleColumn,
    );
  }
}
