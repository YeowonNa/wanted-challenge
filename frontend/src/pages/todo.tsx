import { IconButton } from '@material-tailwind/react';

export default function Todo() {
  return (
    <div className='w-full h-screen flex items-center justify-center gap-1'>
      <div className='w-full flex flex-col max-w-lg'>
        <div className='pt-10 pb-6 px-10  min-h-96 border border-gray-400 bg-white gap-2'>
          <h1 className='flex font-bold justify-center pb-5'>TODO LIST</h1>
          <div className='flex items-center justify-between gap-1'>
            <div className={`w-full border-b border-solid border-gray-700`}>
              테스트1
            </div>
            <IconButton variant='outlined'>
              <i className='fas fa-check' />
            </IconButton>
            <IconButton>
              <i className='fas fa-trash' />
            </IconButton>
          </div>
        </div>
        <div className='p-1 flex items-center justify-center'>
          <IconButton>
            <i className='fa-solid fa-plus' />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
