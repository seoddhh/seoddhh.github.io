import { getCollection } from 'astro:content';

// 프로덕션 빌드에서는 draft를 제외합니다.
const isPublished = ({ data }: { data: { draft: boolean } }) => !import.meta.env.PROD || !data.draft;

export async function getProjects() {
  const projects = await getCollection('projects', isPublished);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getProjectChats(project?: string) {
  const chats = await getCollection(
    'projectChats',
    (entry) => isPublished(entry) && (!project || entry.id.startsWith(`${project}/`)),
  );
  return chats.sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
}

export async function getChats() {
  const chats = await getCollection('chats', isPublished);
  return chats.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const projectOf = (chatId: string) => chatId.split('/')[0];
export const chatSlugOf = (chatId: string) => chatId.split('/')[1];
