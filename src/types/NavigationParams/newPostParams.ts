import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CapturedMediaItem } from "../../components/camera/PostCameraComponent";
import { MediaItem } from "../../screens/MainAppScreens/postScreens/SendNewPost";


export type NewPostNavigationProps = {
    newPost: NativeStackNavigationProp<NewPostParams, "newPost">;
    newPostOptions: NativeStackNavigationProp<NewPostParams, "newPostOptions">;
    sendNewPost: NativeStackNavigationProp<NewPostParams, "sendNewPost">;
    postCameraComponent: NativeStackNavigationProp<NewPostParams, "postCameraComponent">;

};



export type NewPostParams = {
    newPost: { mediaCaptured?: CapturedMediaItem } | undefined;
    newPostOptions: undefined;
    postCameraComponent: { media: CapturedMediaItem } | undefined;
    sendNewPost: { media: MediaItem[] } | undefined;

};
