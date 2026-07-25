import prisma from './prisma';
import type { User } from 'next-auth';

export async function getUser(userId: string, password: string): Promise<User | null> {
  const userInfo = await prisma.user.findUnique({
    where: {
      userId: userId,
      password: password
    }
  });

  if (!userInfo) return null;

  return {
    id: userInfo.id as unknown as string,
    userId: userInfo.userId,
    name: userInfo.name
  }
}

export async function getUserForLogin(userId: string) {
  const userInfo = await prisma.user.findUnique({
    where: {
      userId: userId
    }
  });
  return userInfo;
}

export async function getUsers(name: string): Promise<User[]> {
  const userInfos = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: name } },
        { userId: { contains: name } }
      ]
    }
  });

  const users: User[] = userInfos.map(value => ({
    id: value.id as unknown as string,
    userId: value.userId,
    name: value.name
  }));

  return users;
}

export async function getFriendIds(id: number): Promise<number[]> {
  const friendIds = await prisma.friend.findMany({
    where: {
      id: id
    },
    select: {
      friendId: true
    }
  });

  return friendIds.map((f) => f.friendId);
}

export async function getFriends(id: number): Promise<User[]> {
  const friendIds = await prisma.friend.findMany({
    where: {
      id: id
    },
    include: {
      friend: true
    }
  });

  const friends: User[] = friendIds.map(friend => ({
    id: friend.friendId as unknown as string,
    userId: friend.friend.userId,
    name: friend.friend.name
  }));

  return friends;
}

export async function getMessages(id: number, friendId: number) {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: id, receiverId: friendId },
        { senderId: friendId, receiverId: id }
      ]
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return messages;
}
