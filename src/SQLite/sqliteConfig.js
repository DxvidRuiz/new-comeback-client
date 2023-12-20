// // Import necessary functions from SQLite
// import SQLite ,{openDatabase}from "react-native-sqlite-storage";
// import { createUserTable } from "./tables/CreateUserTable";
// import { useDatabase } from "../context/dbContext/DbContext";

// // Enable promises

// const IIMMABE_DATABASE = "iimmabe_database";
// SQLite.enablePromise(true);

// export async function getDbConnection() {
//   const db = await SQLite.openDatabase({
//     name: IIMMABE_DATABASE,
//     location: "default",
//   });
//   return db;
// }





// Function to close the database connection
// export async function closeDbConnection() {
//   const { db } = useDatabase();

//   if (db) {
//     // Close the database connection
//     try {
//       await db.close();
//       console.log("Database connection closed successfully");
//     } catch (error) {
//       console.error("Error closing the database connection:", error);
//     }
//   } else {
//     console.warn(
//       "Could not close the database connection because it is not open."
//     );
//   }
// }
