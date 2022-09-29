import { AppDataSource } from "../data-source";

export const connectServerToDB = async () => {
  try {
    const connection = await AppDataSource.initialize();
    console.log("Application connected to " + connection.options.database);

    process.on("SIGINT", () => {
      connection.destroy();
    });
  } catch (error) {
    console.log("Something went bad!");
    console.error(error);
  }
};
