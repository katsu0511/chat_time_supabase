'use server';

import { Language } from '@/lib/domain/languages';
import prisma from '@/lib/infrastructure/prisma';

export async function createUser(data: {id: string, name: string, email: string, language: Language}) {
  return await prisma.user.create({ data });
}

export async function addFriend(userId: string, friendId: string) {
  const friendStatus = await prisma.friend.findFirst({
    where: {
      OR: [
        { userId: userId, friendId: friendId },
        { userId: friendId, friendId: userId }
      ]
    }
  });

  if (friendStatus) return 0;

  const rows = await prisma.friend.createMany({
    data: [
      { userId: userId, friendId: friendId },
      { userId: friendId, friendId: userId }
    ],
    skipDuplicates: true
  });
  return rows.count;
}

export async function sendMessage(senderId: string, receiverId: string, originalContent: string, translatedContent: string) {
  const rows = await prisma.message.createMany({
    data: [
      { senderId, receiverId, content: originalContent, isTranslated: false },
      { senderId, receiverId, content: translatedContent, isTranslated: true }
    ]
  });
  return rows.count;
}

export async function changeAccountSetting(id: string, name: string, language: string) {
  return await prisma.user.update({
    where: { id },
    data: {
      name,
      language,
    },
  });
}

export async function changeEmail(id: string, email: string) {
  return await prisma.user.update({
    where: { id },
    data: { email },
  });
}
