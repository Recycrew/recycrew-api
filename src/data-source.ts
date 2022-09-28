import "reflect-metadata"
import { DataSource } from "typeorm"
import { Collect } from "./entities/Collect"
import { Material } from "./entities/Material"
import { User } from "./entities/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "root",
    password: "root",
    database: "recycrew",
    synchronize: true,
    logging: false,
    entities: [User, Collect, Material],
    migrations: ["./migrations/*.ts"],
    subscribers: [],
})
