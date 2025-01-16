import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTodos, createTodo, deleteTodo, updateTodo } from './todos';

export default function TodoAction() {
  const { id } = useParams();

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoContent, setNewTodoContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery('todos', fetchTodos);

  const selectedTodo = id ? data?.data.find((todo) => todo.id === id) : null;

  const createMutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      setNewTodoTitle('');
      setNewTodoContent('');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error.message);
    },
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      navigate('/todo');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error.message);
    },
  });

  const updateMutation = useMutation(
    (updatedTodo: { id: string; title: string; content: string }) =>
      updateTodo(updatedTodo.id, {
        title: updatedTodo.title,
        content: updatedTodo.content,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
        setIsEditing(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        alert(error.message);
      },
    }
  );

  const handleAddClick = () => {
    navigate('/todo');
  };

  const handleTodoClick = (todo: { id: string }) => {
    navigate(`/todo/${todo.id}`);
  };

  const handleCreateTodo = () => {
    if (!newTodoTitle || !newTodoContent) {
      alert('제목과 내용을 모두 입력해주세요!');
      return;
    }

    createMutation.mutate({
      title: newTodoTitle,
      content: newTodoContent,
    });
  };

  const handleDeleteTodo = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleUpdateTodo = () => {
    if (!selectedTodo) return;

    updateMutation.mutate({
      id: selectedTodo.id,
      title: selectedTodo.title,
      content: selectedTodo.content,
    });
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/auth/sign-in');
  };

  return {
    isLoading,
    error,
    handleLogout,
    data,
    handleTodoClick,
    id,
    selectedTodo,
    isEditing,
    updateMutation,
    handleDeleteTodo,
    handleEditToggle,
    handleAddClick,
    handleUpdateTodo,
    handleCreateTodo,
    handleCancel,
    newTodoTitle,
    setNewTodoTitle,
    newTodoContent,
    setNewTodoContent,
  };
}
