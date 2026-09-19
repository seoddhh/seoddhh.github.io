import { getCollection, type CollectionEntry } from 'astro:content';

export type ChatEntry = CollectionEntry<'projectChats'> | CollectionEntry<'chats'>;

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

export async function getLibrary() {
  const items = await getCollection('library', isPublished);
  return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getProfile() {
  const [profile] = await getCollection('profile');
  return profile;
}

export async function getSuggestedChats(): Promise<ChatEntry[]> {
  const [projectChats, chats] = await Promise.all([getProjectChats(), getChats()]);
  return [...projectChats, ...chats].filter((chat) => chat.data.suggested);
}

export const projectOf = (chatId: string) => chatId.split('/')[0];
export const chatSlugOf = (chatId: string) => chatId.split('/')[1];

export const chatHref = (chat: ChatEntry) =>
  chat.collection === 'projectChats' ? `/p/${chat.id}` : `/c/${chat.id}`;

// 대화 본문에서 첫 번째 `:::user` 질문을 꺼냅니다. (목록 미리보기, 추천 질문용)
export function firstQuestion(body?: string) {
  const match = body?.match(/^:::user[ \t]*\n([\s\S]*?)\n:::[ \t]*$/m);
  return match?.[1].trim() ?? '';
}
