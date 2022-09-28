import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Collect1663860736992 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "collections",
        columns: [
          {
            name: "id",
            type: "numeric",
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: "material_ids",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "donator_id",
            type: "int",
          },
          {
            name: "collector_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "collect_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "status",
            type: "varchar",
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      "materials",
      new TableForeignKey({
        name: "FKCollectMaterials",
        columnNames: ["material_ids"],
        referencedTableName: "materials",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("collections");
  }
}
