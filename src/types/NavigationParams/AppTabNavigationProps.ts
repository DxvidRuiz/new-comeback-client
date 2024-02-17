import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// Tipo genérico para representar cualquier tipo de estructura de navegación dentro de una pestaña
type TabScreenNavigationProp = BottomTabNavigationProp<AppTabNavigationParams, keyof AppTabNavigationParams>;

// Utilizando RouteProp para definir las props de pantalla
export type AppTabNavigationProps = {
  feed: TabScreenNavigationProp;
  profile: TabScreenNavigationProp;
  messages: TabScreenNavigationProp;
  newPostOptions: TabScreenNavigationProp;
  // Otros tipos de navegación...
};

export type AppTabNavigationParams = {
  feed: undefined;
  profile: undefined; // Utilizando undefined para mantener consistencia
  messages: undefined;
  newPostOptions: undefined;
};

