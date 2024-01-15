// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { ApiRequest_I } from "../../types/apiTypes";
// import { getAsyncStorage } from "../../localStorage/GetAsyncStorage";
// import { AsyncStorageKeys } from "../../localStorage/enum/asyncStorageKeys";

// export const apiCallEditUserThunk = createAsyncThunk(
//   'api/call',
//   async (apiRequest: ApiRequest_I, { rejectWithValue }) => {
//     try {
//       // Obtener el token desde el almacenamiento asíncrono
//       const currentToken  = await getAsyncStorage<string>(AsyncStorageKeys.AUTH_TOKEN );

//       // Crear un nuevo objeto de solicitud sin la propiedad token si no hay token disponible
//       const modifiedApiRequest = currentToken
//         ? { ...apiRequest, token: currentToken }
//         : { ...apiRequest };

//       // Enviar la solicitud a la API
//       const response = await axiosRequest(modifiedApiRequest);
//       return response; // Este será el payload de la acción fulfilled
//     } catch (error) {
//       return rejectWithValue(error.message); // Este será el payload de la acción rejected
//     }
//   }
// );

