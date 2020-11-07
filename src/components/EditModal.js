import React, { useState } from "react";

import {
  View,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ value, visible, onCancel, onSave }) => {
  const [title, setTitle] = useState(value);
  const saveHandler = () => {
    if (title.trim() < 3) {
      Alert.alert("Ошибка!", "Минимальная длина названия - 3 символа");
    } else {
      onSave(title);
    }
  };
  const onCancelHandler = () => {
    setTitle(value)
    onCancel()
  }
  return (
    <Modal animationType="slide" visible={visible} transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.buttons}>
          <AppButton onPress={onCancelHandler} color={THEME.DANGER_COLOR}>
            Cancel
          </AppButton>
          <AppButton onPress={saveHandler}>Save</AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%",
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-around',
  },
});
