// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { saveSQLite } from '../../SQLite/actions/addRecordToTable';

// // Thunk para guardar en SQLite
// export const guardarDatosUsuarioEnSQLite = createAsyncThunk(
//   'usuario/guardarEnSQLite',
//   async ({ table, date }, { dispatch }) => {
//     try {
//       // Lógica asíncrona de guardado en SQLite
//       await saveSQLite(table, date);

//       // Se devuelve directamente el resultado para ser usado en reducers
//       return date;
//     } catch (error) {
//       // Puedes lanzar un error o manejarlo aquí
//       throw new Error('Error al guardar en SQLite: ' + error.message);
//     }
//   }
// );
