'use server';

import { Prisma } from '@/lib/generated/prisma/client';
import prisma from '@/lib/prisma';
import hashedPassword from '@/lib/hashPassword';

export async function createUser(data: {name: string, userId: string, password: string}) {
  try {
    data.password = await hashedPassword(data.password);
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        userId: true,
        name: true
      }
    });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      if (error.constructor.name === 'PrismaClientKnownRequestError' && (error as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
        console.error('This user ID is already used: ', error.message);
        return `This user ID is already used.`;
      } else {
        console.error('General error: ', error);
        return `General error`;
      }
    } else {
      console.error('Unknown error: ', error);
      return `Unknown error`;
    }
  }
}

export async function addFriend(id: number, friendId: number) {
  const friendStatus = await prisma.friend.findFirst({
    where: {
      OR: [
        { id: id, friendId: friendId },
        { id: friendId, friendId: id }
      ]
    }
  });

  if (friendStatus) return 0;

  const rows = await prisma.friend.createMany({
    data: [
      { id: id, friendId: friendId },
      { id: friendId, friendId: id }
    ],
    skipDuplicates: true
  });
  return rows.count;
}

export async function sendMessage(senderId: number, receiverId: number, content: string) {
  const message = await prisma.message.create({
    data: {
      senderId,
      receiverId,
      content
    }
  });
  return message;
}
