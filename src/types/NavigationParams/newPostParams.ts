import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MediaItem } from "../../screens/MainAppScreens/postScreens/SendNewPost";


export type NewPostNavigationProps = {
    newPost: NativeStackNavigationProp<NewPostParams, "newPost">;
    newPostOptions: NativeStackNavigationProp<NewPostParams, "newPostOptions">;
    sendNewPost: NativeStackNavigationProp<NewPostParams, "sendNewPost">;
    postCameraComponent: NativeStackNavigationProp<NewPostParams, "postCameraComponent">;

};



export type NewPostParams = {
    newPost: undefined;
    newPostOptions: undefined;
    postCameraComponent: undefined;

    sendNewPost: { media: MediaItem[] } | undefined;

};
