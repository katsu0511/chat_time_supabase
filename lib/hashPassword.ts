import { hash } from 'bcrypt';

export default async function hashedPassword(password: string): Promise<string> {
  try {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  } catch(error) {
    console.error('Hashing failed: ', error);
    throw error;
  }
}
