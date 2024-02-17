// PostIcon.js
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface PostIcon_i {

    iconName: any,
    number?: any
}


const PostIcon = ({ iconName, number }: PostIcon_i) => {
    const theme = useTheme();
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <Ionicons name={iconName} size={24} color="red" /> */}

            {iconName}

            <Text style={{ marginLeft: 5, color: theme.colors.onPrimary, fontSize: 12 }}>{number}</Text>
        </View>
    );
};

export default PostIcon;
