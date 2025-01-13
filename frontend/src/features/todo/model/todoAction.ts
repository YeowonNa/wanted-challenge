export const todoAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const title = formData.get('title') as string;

  if (request.method === 'POST') {
    const response = await fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      throw new Error('투두 생성에 실패했습니다.');
    }
    return response.json();
  }

  throw new Error('Unhandled action method');
};
