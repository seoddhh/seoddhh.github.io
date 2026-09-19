import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 파일명 앞의 정렬용 숫자(`01-`)와 확장자를 제거합니다.
const stripOrderPrefix = (name: string) => name.replace(/\.md$/, '').replace(/^\d+-/, '');

const links = z
  .object({
    github: z.url().optional(),
    demo: z.url().optional(),
  })
  .default({});

const chatSchema = z.object({
  title: z.string(),
  date: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  order: z.number().optional(),
  suggested: z.boolean().default(false),
  draft: z.boolean().default(false),
});

// 프로젝트 메타: projects/[project]/_project.md → id: [project]
const projects = defineCollection({
  loader: glob({
    pattern: '*/_project.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    period: z.string().optional(),
    role: z.string().optional(),
    tags: z.array(z.string()).default([]),
    links,
    order: z.number().default(999),
    draft: z.boolean().default(false),
  }),
});

// 프로젝트 대화: projects/[project]/01-overview.md → id: [project]/overview
const projectChats = defineCollection({
  loader: glob({
    pattern: ['*/*.md', '!*/_project.md'],
    base: './src/content/projects',
    generateId: ({ entry }) => {
      const [project, file] = entry.split('/');
      return `${project}/${stripOrderPrefix(file)}`;
    },
  }),
  schema: chatSchema,
});

// 채팅(TIL, 기술 글): chats/[slug].md → id: [slug]
const chats = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/chats' }),
  schema: chatSchema.extend({
    date: z.coerce.date(),
  }),
});

// 라이브러리(자격증·수료증·상장): library/[slug].md + 같은 폴더의 이미지 → /library#[slug]
const library = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/library' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      kind: z.enum(['자격증', '수료증', '상장']),
      issuer: z.string(),
      date: z.coerce.date(),
      image: image(),
      alt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

// 프로필 패널
const profile = defineCollection({
  loader: glob({ pattern: 'profile.md', base: './src/content' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    avatar: z.string().optional(),
    stack: z.array(z.string()).default([]),
    contact: z
      .object({
        email: z.email().optional(),
        github: z.url().optional(),
        linkedin: z.url().optional(),
      })
      .default({}),
    resume: z.string().optional(),
  }),
});

export const collections = { projects, projectChats, chats, library, profile };
