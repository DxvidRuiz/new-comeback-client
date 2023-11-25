// GenderSelection.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MD3Theme, RadioButton, Text, useTheme } from 'react-native-paper';
import SmallText from '../../common/text/SmallText';

interface GenderSelectionProps {
  onGenderChange: (gender: string) => void;
}

const GenderSelection: React.FC<GenderSelectionProps> = ({ onGenderChange }) => {
  const theme = useTheme();
  const styles = style(theme);
  const [gender, setGender] = useState<string>('');

  const handleGenderChange = (newGender: string) => {
    setGender(newGender);
    onGenderChange(newGender); // Llama a la función proporcionada con el nuevo valor de género
  };

  return (
    <View style={styles.GenderSelectionContainer}>
      <SmallText text='Gender' fontWeight={"500"} />
      <RadioButton.Group onValueChange={handleGenderChange} value={gender}>
        <View style={styles.buttonGroup}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="male" color={theme.colors.secondary} />
            <Text>Male</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="female" color={theme.colors.secondary} />
            <Text>Female</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="nonbinary" color={theme.colors.secondary} />
            <Text>Nonbinary</Text>
          </View>
        </View>
      </RadioButton.Group>
    </View>
  );
};

const style = (theme: MD3Theme) => StyleSheet.create({
  GenderSelectionContainer: {},
  buttonGroup: { flexDirection: "row", justifyContent: "space-around" }
});

export default GenderSelection;
