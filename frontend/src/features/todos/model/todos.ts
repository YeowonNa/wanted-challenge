export type TodosData = {
  title: string;
  content: string;
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TodoItem = {
  data: TodosData[];
};

export type CreateTodo = {
  title: string;
  content: string;
};

export const fetchTodos = async (): Promise<TodoItem> => {
  const token = localStorage.getItem('authToken')!;
  if (!token) {
    throw new Error('로그인 토큰이 없습니다.');
  }

  const response = await fetch('http://localhost:8080/todos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('투두리스트를 가져오는 데 실패했습니다.');
  }
  return response.json();
};

export const createTodo = async (data: CreateTodo) => {
  const token = localStorage.getItem('authToken')!;
  if (!token) {
    throw new Error('로그인 토큰이 없습니다.');
  }

  const response = await fetch('http://localhost:8080/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: data.title, // title
      content: data.content, // content
    }),
  });

  if (!response.ok) {
    throw new Error('투두리스트를 생성하는데 실패했습니다.');
  }

  return response.json();
};

export const deleteTodo = async (id: string) => {
  const token = localStorage.getItem('authToken')!;
  if (!token) {
    throw new Error('로그인 토큰이 없습니다.');
  }

  const response = await fetch(`http://localhost:8080/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('투두리스트 항목을 삭제하는데 실패했습니다.');
  }

  return response.json();
};

export const updateTodo = async (
  id: string,
  data: { title: string; content: string }
) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('로그인 토큰이 없습니다.');
  }

  const response = await fetch(`http://localhost:8080/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('투두리스트를 업데이트하는데 실패했습니다.');
  }

  return response.json();
};
