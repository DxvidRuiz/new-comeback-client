import { useDBContext } from "../../context/dbContext/DbContext";

export const addRecordToTable = async (
  tableName: string,
  recordData: Record<string, any>
) => {
  // Get the database instance
  const db = useDBContext();

  try {
    // Begin a transaction
    await db.transaction(async (tx) => {
      // Create the query dynamically based on the keys and values of the recordData object
      const columns = Object.keys(recordData).join(", ");
      const values = Object.values(recordData)
        .map((value) => JSON.stringify(value))
        .join(", ");

      const query = `INSERT INTO "${tableName}" (${columns}) VALUES (${values})`;
      // Execute the SQL statement
      const [result] = await tx.executeSql(query);
      
      if (result.rowsAffected > 0) {
        console.log(`Record added successfully to the ${tableName} table`);
      } else {
        console.warn(`No record added to the ${tableName} table`);
      }
    });

    console.log(`Record added successfully to the ${tableName} table`);
  } catch (error) {
    console.error(`Error adding the record to the ${tableName} table:`, error);
    throw error;
  }
};
