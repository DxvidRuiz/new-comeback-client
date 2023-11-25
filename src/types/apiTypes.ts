// apiTypes.ts

export enum METOD_E {
  GET = "get",
  POST= "post",
  PUT= "put",
  DELETE= "delete",
  PATCH="patch"

}

export interface ApiRequest_I {
  endpoint?: string;
  base_url: string;
  method: METOD_E
  data?: any; // Puede ser un tipo más específico si es necesario
  params?: any; // Puede ser un tipo más específico si es necesario
  headers?: any; // Opcional: Para cuando necesites enviar headers específicos
}
