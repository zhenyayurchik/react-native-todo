import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';

import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS,
} from '../types';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { ScreenContext } from '../screen/screenContext';
import { Http } from '../../http';

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { changeScreen } = useContext(ScreenContext);

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get(
        'https://rn-todo-app-28e4e.firebaseio.com/todos.json'
      );
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
      hideLoader();
    } catch (error) {
      showError('error');
    } finally {
      hideLoader();
    }
  };

  const addTodo = async (title) => {
    const data = await Http.post(
      'https://rn-todo-app-28e4e.firebaseio.com/todos.json',
      { title }
    );
    dispatch({ type: ADD_TODO, title, id: data.name });
  };

  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert(
      'Удаление элемента',
      `Вы уверены что хотите удалить элемент ${todo.title}`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: async () => {
            changeScreen(null);
            await Http.delete(
              `https://rn-todo-app-28e4e.firebaseio.com/todos/${id}.json`
            );
            dispatch({ type: REMOVE_TODO, id });
          },
        },
      ],
      { cancelable: false }
    );
  };



  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(
        `https://rn-todo-app-28e4e.firebaseio.com/todos/${id}.json`,
        {title}
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (error) {
      showError('error');
    }
  };
  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
