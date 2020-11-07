import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { THEME } from "./theme";
import { Navbar } from "./components/Navbar";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  return (
    <View style={styles.wrapper}>
      <Navbar title={"Todo App"} />
      <View style={styles.container}>
        {!todoId ? <MainScreen /> : <TodoScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});
