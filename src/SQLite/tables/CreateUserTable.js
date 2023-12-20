export async function createUserTable(db) {
  // Obtén la instancia de la base de datos desde el contexto

  // SQL query to create the users table with the new fields
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      name TEXT NOT NULL,
      lastname TEXT NOT NULL,
      gender TEXT NOT NULL,
      dateOfBirth TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `;

  try {
    db.transaction((tx) => {
      tx.executeSql(
        createTableQuery
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM user",
        null,
        (txObj, resultSet) => setNames(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });


  } catch (error) {
    console.error("Error creating user table:", error);
  }
}

// No necesitas llamar a la función aquí si la intención es ejecutarla al inicializar la base de datos
// createUserTable();
