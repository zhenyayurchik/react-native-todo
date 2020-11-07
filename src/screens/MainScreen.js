import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { THEME } from '../theme';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';
import { AppLoader } from '../components/ui/AppLoader';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';

export const MainScreen = () => {
  const { addTodo, removeTodo, todos, fetchTodos, loading, error } = useContext(
    TodoContext
  );
  const { changeScreen } = useContext(ScreenContext);

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  );

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () =>
      setDeviceWidth(
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      );

    Dimensions.addEventListener('change', update);

    return () => Dimensions.removeEventListener('change', update);
  });

  let content = (
    <View style={{ deviceWidth }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
      />
    </View>
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.img}
          source={require('../../assets/noItems.png')}
        />
      </View>
    );
  }
  if (error && loading) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Повторить</AppButton>
      </View>
    );
  }

  return loading ? (
    <AppLoader />
  ) : (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300,
  },
  img: {
    resizeMode: 'contain',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
  },
});
