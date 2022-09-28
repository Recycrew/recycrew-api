import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1663854192944 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "numeric",
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "document_type",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "document_number",
            type: "numeric",
            isUnique: true,
            isNullable: true,
          },
          {
            name: "collector",
            type: "boolean",
          },
          {
            name: "phone_number",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "isAdmin",
            type: "boolean",
            default: false,
          },
          {
            name: "cep",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "street_and_number",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "complement",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "city_and_state",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
