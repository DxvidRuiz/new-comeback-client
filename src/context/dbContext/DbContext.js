import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { createUserTable } from '../../SQLite/tables/CreateUserTable';

const DbContext = createContext();

export const useDBContext = () => {
  return useContext(DbContext);
};

export const DbContextProvider = ({ children }) => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      const database = SQLite.openDatabase('iimmabeTest.db');

      // Realiza cualquier inicialización necesaria aquí, como la creación de tablas
      createUserTable(database)
      setDb(database);
      console.log("sqlite db connected");
    };

    initializeDatabase();

    // Cleanup: cierra la base de datos cuando el componente se desmonta
    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);

  // Muestra un mensaje si la base de datos aún no se ha inicializado
  if (!db) {
    return (
      <View>
        <Text>Loading database...</Text>
      </View>
    );
  }

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
};
