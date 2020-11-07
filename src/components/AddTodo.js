import React, { useState } from "react";
import { View, StyleSheet, TextInput, Keyboard, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { THEME } from "../theme";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const presshandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss()
    } else {
      Alert.alert("Название дела пустое");
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Введите название дела..."
        autoCorrect={false}
        autoCapitalize="none"
      />
      <AntDesign.Button onPress={presshandler} name="pluscircleo">
        Добавить
      </AntDesign.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    width: "60%",
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
});
