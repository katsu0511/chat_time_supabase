import prisma from '@/lib/prisma';

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function getUsers(name: string): Promise<User[]> {
  return await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: name } },
        { userId: { contains: name } }
      ]
    }
  });
}

export async function getFriendIds(id: string): Promise<string[]> {
  const friendIds = await prisma.friend.findMany({
    where: {
      userId: id
    },
    select: {
      friendId: true
    }
  });

  return friendIds.map((f) => f.friendId);
}

export async function getFriends(id: string): Promise<User[]> {
  const friends = await prisma.friend.findMany({
    where: {
      userId: id
    },
    include: {
      friend: true
    }
  });

  return friends.map(friendInfo => ({
    id: friendInfo.friendId,
    name: friendInfo.friend.name,
    email: friendInfo.friend.email,
    language: friendInfo.friend.language
  }));
}

export async function getMessages(id: string, friendId: string) {
  return await prisma.message.findMany({
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
}
