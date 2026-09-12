import dayjs from 'dayjs';

export default function MessageDate({ createdAt }: { createdAt: Date }) {
  const date = dayjs(createdAt).format('YYYY/M/D');

  return (
    <div className='sticky top-0 flex justify-center w-full h-5 z-10'>
      <span className='block bg-gray-600/30 text-sm text-white w-22 h-4 leading-4 text-center rounded-xl mt-1'>{date}</span>
    </div>
  );
}
