import { HttpError } from 'wasp/server'

export const uploadFile = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const newFile = await context.entities.File.create({
    data: {
      name: args.file.name,
      type: args.file.type,
      size: args.file.size,
      uploadedAt: new Date(),
      userId: context.user.id
    }
  });
  return newFile;
}

export const deleteFile = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const file = await context.entities.File.findUnique({
    where: { id: args.fileId }
  });
  if (!file) { throw new HttpError(400) };
  if (file.userId !== context.user.id) { throw new HttpError(400) };
  await context.entities.File.delete({
    where: { id: args.fileId }
  });
}

export const updateProfile = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.User.update({
    where: { id: context.user.id },
    data: args
  });
}