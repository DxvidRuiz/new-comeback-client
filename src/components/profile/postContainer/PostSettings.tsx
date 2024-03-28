import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { alarmError, alarmsuccess } from '../../../common/Alerts/showMessage';
import { deletePost } from '../../../redux/actions/profile.actions';
import { RootState, useAppDispatch } from '../../../redux/store/store';
import ActionConfirmationAlert from '../../Modals/ActionConfirmationAlert';

const PostSettings = ({ postId, onPostDeleteSuccess }) => {
    const { t } = useTranslation()
    const theme = useTheme();
    const styles = style(theme);
    const dispatch = useAppDispatch();
    const { loadingNewPost, newPost: data, loadingDeletePost } = useSelector((state: RootState) => state.profileSlices)

    const [modalVisible, setModalVisible] = useState(false);

    const handleDeleteConfirm = async () => {
        try {
            const response = await dispatch(deletePost(postId));


            console.log("response before if", response);


            if (response.meta.requestStatus === 'fulfilled') {
                console.log("Deletion completed successfully");
                setModalVisible(false);
                alarmsuccess({
                    duration: 5000,
                    title: t("alert.post_deleted_successfully"),
                    // description: t("label.your_post_has_been_shared")
                })
                if (typeof onPostDeleteSuccess === 'function') {
                    onPostDeleteSuccess();
                }

            } else if (response.meta.requestStatus === 'rejected') {


                console.log("Deletion not completed successfully");

                // const errorPayload = response?.payload;
                // const errorCode = errorPayload?.message?.status;
                // console.error(`Error: ${errorCode}`);
                setModalVisible(false);
                alarmError({
                    duration: 5000,
                    title: t("alert.post_not_deleted"),
                    // description: t("alert.your_post_could_not_be_shared")
                })

            }
        } catch (error) {
            setModalVisible(false);
            alarmError({
                duration: 5000,
                title: t("alert.post_not_deleted"),
                // description: t("alert.your_post_could_not_be_shared")
            })
            // Handle any other errors that were not caught by the promise
        }
        // Perform necessary actions when the action is confirmed
    };

    // Function to cancel action
    const handleCancel = () => {
        // Perform necessary actions when the action is cancelled
        console.log('Action cancelled');
        setModalVisible(false);
    };




    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.option} onPress={() => alert('Edit post')}>
                <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => alert('Delete post')}>
                <Text style={styles.text}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => alert('Share post')}>
                <Text style={styles.text}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => alert('Hide post')}>
                <Text style={styles.text}>Hide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => setModalVisible(true)}>
                <FontAwesome5 name="trash-alt" size={18} color="black" />
                <Text style={styles.text}>{t("action.delete_post")}</Text>
            </TouchableOpacity>
            <ActionConfirmationAlert
                loading={loadingDeletePost}
                isVisible={modalVisible}
                onCancel={handleCancel}
                onConfirm={handleDeleteConfirm}
                title={t("action.delete_post")}
                message={t("action.post_delete_confirmation")}
                loadingTitle={t("action.deleting_post")}

            />
        </View>
    );
};

const style = (theme: MD3Theme) => StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
    },
    option: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        gap: 5

    },
    text: {
        fontSize: 16,
    },
});

export default PostSettings;
