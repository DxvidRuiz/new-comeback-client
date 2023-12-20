import { useDBContext } from "../../context/dbContext/DbContext";

export const editRecordInTable = async (
  tableName: string,
  recordId: string,
  updatedData: Record<string, any>
) => {
  // Get the database instance
  const db = useDBContext();

  try {
    // Begin a transaction
    const result = await db.transaction(async (tx) => {
      // Create the SET clause dynamically based on the updatedData object
      const setClause = Object.entries(updatedData)
        .map(([key, value]) => `${key} = ${JSON.stringify(value)}`)
        .join(", ");

      // Update the record with the provided ID
      const query = `UPDATE "${tableName}" SET ${setClause} WHERE id = ?`;
      const [updateResult] = await tx.executeSql(query, [recordId]);

      // Return the rows affected
      return updateResult.rowsAffected;
    });

    if (result > 0) {
      console.log(`Record updated successfully in the ${tableName} table`);
    } else {
      console.warn(`No record updated in the ${tableName} table`);
    }

    return result;
  } catch (error) {
    console.error(`Error updating record in the ${tableName} table:`, error);
    throw error;
  }
};
