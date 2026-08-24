import prisma from '@/lib/prisma';

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function getUsers(name: string): Promise<AppUser[]> {
  return await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: name } },
        { email: { contains: name } }
      ]
    }
  });
}

export async function getFriendIds(userId: string): Promise<string[]> {
  const friendIds = await prisma.friend.findMany({
    where: {
      userId,
    },
    select: {
      friendId: true
    }
  });

  return friendIds.map((f) => f.friendId);
}

export async function getFriends(userId: string): Promise<AppUser[]> {
  const friends = await prisma.friend.findMany({
    where: {
      userId,
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

export async function getMessages(userId: string, friendId: string) {
  return await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId }
      ]
    },
    orderBy: {
      createdAt: 'asc'
    }
  });
}
