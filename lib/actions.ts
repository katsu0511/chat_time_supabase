import { Prisma } from '@/lib/generated/prisma/client';
import prisma from '@/lib/prisma';

export async function createUser(data: {id: string, name: string, email: string}) {
  try {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.constructor.name === 'PrismaClientKnownRequestError' && (error as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
        console.error('This user ID is already used: ', error.message);
        return `This user ID is already used.`;
      }
      console.error('General error: ', error);
      return `General error`;
    }
    console.error('Unknown error: ', error);
    return `Unknown error`;
  }
}

export async function addFriend(userId: string, friendId: string) {
  const friendStatus = await prisma.friend.findFirst({
    where: {
      OR: [
        { userId, friendId },
        { friendId, userId }
      ]
    }
  });

  if (friendStatus) return 0;

  const rows = await prisma.friend.createMany({
    data: [
      { userId, friendId },
      { friendId, userId }
    ],
    skipDuplicates: true
  });
  return rows.count;
}

export async function sendMessage(senderId: string, receiverId: string, content: string) {
  return await prisma.message.create({
    data: {
      senderId,
      receiverId,
      content
    }
  });
}
