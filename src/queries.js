import { HttpError } from 'wasp/server'

export const getUserFiles = async (arg, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.File.findMany({
    where: { userId: context.user.id }
  });
}

export const getFileDetails = async (arg, context) => {
  if (!context.user) { throw new HttpError(401) };
  const file = await context.entities.File.findUnique({
    where: { id: arg.id },
    select: { id: true, name: true, type: true, size: true, userId: true }
  });
  if (!file) throw new HttpError(404, 'File not found');
  if (file.userId !== context.user.id) throw new HttpError(400, 'File does not belong to user');
  return file;
}

export const getUserDetails = async (arg, context) => {
  if (!context.user) { throw new HttpError(400) }

  return context.entities.User.findUnique({
    where: { id: context.user.id },
    select: {
      id: true,
      email: true,
      password: true
    }
  });
}