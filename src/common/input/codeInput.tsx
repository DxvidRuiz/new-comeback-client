import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { MD3Theme, useTheme } from 'react-native-paper';
import { COLORS } from '../../styles/colors';



const CELL_COUNT = 6;

const codeInput = () => {


    const theme = useTheme();
    const styles = style(theme)
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    return (
        <SafeAreaView style={styles.root}>
            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"

                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
        </SafeAreaView>
    );
};

export default codeInput;

const style = (theme: MD3Theme) => StyleSheet.create({
    root: {},
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: {},
    cell: {
        width: 30,
        height: 40,
        lineHeight: 38,

        fontSize: 24,
        borderColor: theme.colors.secondary,
        color: theme.colors.secondary,
        backgroundColor: COLORS.gray02,
        borderRadius: 8,

        textAlign: 'center',
    },
    focusCell: {
        backgroundColor: COLORS.gray01,
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.secondary,
    },
});