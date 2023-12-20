import { useDBContext } from "../../context/dbContext/DbContext";

export const getRecordsFromTable = async (tableName: string) => {
  // Get the database instance
  const db = useDBContext();

  try {
    // Begin a transaction
    const result = await db.transaction(async (tx) => {
      // Select all records from the table
      const query = `SELECT * FROM "${tableName}"`;
      const [queryResult] = await tx.executeSql(query);

      // Extract and return the rows
      return queryResult.rows._array;
    });

    console.log(`Records retrieved successfully from the ${tableName} table`);
    return result;
  } catch (error) {
    console.error(`Error retrieving records from the ${tableName} table:`, error);
    throw error;
  }
};
