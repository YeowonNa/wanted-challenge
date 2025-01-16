import {
  Button,
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Input,
  List,
  ListItem,
  Spinner,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import TodoAction from '../../features/todos/model/todo.action';

export default function Todo() {
  const {
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
  } = TodoAction();

  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Spinner color='blue' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <p className='text-red-500'>에러가 발생했습니다. 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-1'>
      <div className='w-[770px] flex items-center justify-between'>
        <div className='flex flex-col'>
          <div className='font-bold text-3xl'>ToDoList</div>
          <div className='text-sm text-gray-600'>투두리스트</div>
        </div>
        <Button onClick={handleLogout}>logout</Button>
      </div>

      <div className='flex gap-3 pt-5'>
        <Card className='w-96 min-h-96'>
          <CardBody>
            <div className='mb-2 flex items-center justify-between'>
              <Typography variant='h5' color='black' className='mb-2'>
                List
              </Typography>
              <IconButton variant='outlined' size='sm' onClick={handleAddClick}>
                <i className='fas fa-plus' />
              </IconButton>
            </div>
            <List>
              {data?.data.map((todo) => (
                <ListItem
                  key={todo.id}
                  onClick={() => handleTodoClick(todo)}
                  selected={id === todo.id}
                >
                  {todo.title}
                </ListItem>
              ))}
            </List>
          </CardBody>
        </Card>

        {selectedTodo ? (
          <Card className='w-96 min-h-96'>
            <CardBody>
              <div className='mb-2 flex items-center justify-between'>
                {isEditing ? (
                  <Input
                    value={selectedTodo.title}
                    onChange={(e) => {
                      if (!selectedTodo) return;
                      updateMutation.mutate({
                        id: selectedTodo.id,
                        title: selectedTodo.title,
                        content: e.target.value, // 새로운 값을 서버에 전달
                      });
                    }}
                    label='Title'
                  />
                ) : (
                  <>
                    <Typography
                      variant='h5'
                      color='black'
                      className='mb-2 flex-grow'
                    >
                      {selectedTodo?.title || 'title'}
                    </Typography>
                    <div className='flex gap-1'>
                      <IconButton
                        variant='outlined'
                        size='sm'
                        onClick={() => handleDeleteTodo(selectedTodo.id)}
                      >
                        <i className='fas fa-trash' />
                      </IconButton>
                      <IconButton
                        variant='outlined'
                        size='sm'
                        onClick={handleEditToggle}
                      >
                        <i className='fas fa-pencil' />
                      </IconButton>
                    </div>
                  </>
                )}
              </div>
              {isEditing ? (
                <Textarea
                  value={selectedTodo.content}
                  onChange={(e) => {
                    if (!selectedTodo) return;
                    updateMutation.mutate({
                      id: selectedTodo.id,
                      title: selectedTodo.title,
                      content: e.target.value, // 새로운 값을 서버에 전달
                    });
                  }}
                  label='Content'
                />
              ) : (
                <Typography className='font-normal'>
                  {selectedTodo.content}
                </Typography>
              )}
            </CardBody>
            <CardFooter>
              {isEditing && (
                <div className='flex gap-1'>
                  <Button variant='outlined' onClick={handleUpdateTodo}>
                    저장
                  </Button>
                  <Button variant='outlined' onClick={handleCancel}>
                    취소
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        ) : (
          <Card className='w-96 min-h-96'>
            <CardBody>
              <Typography variant='h5' color='black' className='mb-5'>
                새로운 할 일 추가
              </Typography>

              <div className='flex flex-col gap-2'>
                <Input
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  label='Title'
                />

                <Textarea
                  value={newTodoContent}
                  onChange={(e) => setNewTodoContent(e.target.value)}
                  label='Content'
                />
              </div>
            </CardBody>
            <CardFooter>
              <Button variant='outlined' onClick={handleCreateTodo}>
                등록
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
