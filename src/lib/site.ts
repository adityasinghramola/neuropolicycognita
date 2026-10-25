import { getCollection, type CollectionEntry } from 'astro:content';

export type Lens = 'finance' | 'politics' | 'marketing' | 'thinking';
export type Article = CollectionEntry<'articles'>;

// Prefix internal links with the base path (needed while the site lives at username.github.io/repo/).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => BASE + (path.startsWith('/') ? path : '/' + path);

export const SECTIONS: Record<Lens, { label: string; title: string; lede: string; short: string; questions: string[] }> = {
  finance: {
    label: 'Finance',
    title: 'Financial Intelligence and Analysis',
    short: 'Market analysis, investment strategies, and economic trends affecting business and policy decisions in global markets.',
    lede: 'How investors actually behave, and what that means for prices, portfolios and policy.',
    questions: ['Why do retail investors chase momentum?', 'What does a rate decision really signal?', 'How do defaults shape national savings?'],
  },
  politics: {
    label: 'Politics',
    title: 'Political Thought and Policy',
    short: 'Analysing political systems, governance frameworks, and policy implications in a rapidly evolving global landscape.',
    lede: 'Governance, geopolitics and the human behaviour that makes policy succeed or fail.',
    questions: ['Can nudges replace mandates?', 'Why do welfare schemes miss the people they target?', 'What makes a policy stick?'],
  },
  marketing: {
    label: 'Marketing',
    title: 'Marketing Strategy and Consumer Behaviour',
    short: 'Strategic marketing frameworks, consumer behaviour analysis, and brand positioning strategies for competitive markets.',
    lede: 'How brands earn attention, shape preferences and position themselves in crowded markets.',
    questions: ['Why does ₹999 feel cheaper than ₹1,000?', 'Do discounts train customers to wait?', 'How does scarcity sell?'],
  },
  thinking: {
    label: 'Thinking Cognita',
    title: 'Thinking Cognita',
    short: 'Essays and reflections on judgement, attention and the everyday choices that add up to a life.',
    lede: 'Essays and reflections on the mind itself: judgement, attention and the everyday choices that add up to a life.',
    questions: ['Why is the obvious choice so often wrong?', 'What does attention cost us?', 'How do we change our minds?'],
  },
};

export const LENS_ORDER: Lens[] = ['finance', 'politics', 'marketing', 'thinking'];

export async function allArticles(): Promise<Article[]> {
  const items = await getCollection('articles', ({ data }) => import.meta.env.DEV || !data.draft);
  return items.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const lensesOf = (a: Article): Lens[] => [a.data.section, ...a.data.lenses.filter((l) => l !== a.data.section)];

// Articles in a section: those filed there first, then those that touch it from another section.
export function inSection(items: Article[], lens: Lens) {
  return {
    home: items.filter((a) => a.data.section === lens),
    crossing: items.filter((a) => a.data.section !== lens && a.data.lenses.includes(lens)),
  };
}

// Related reads ranked by shared lenses; pieces from a different section get a small boost
// so readers are pulled across disciplines rather than kept in one silo.
export function related(items: Article[], current: Article, n = 3) {
  const mine = new Set(lensesOf(current));
  return items
    .filter((a) => a.id !== current.id)
    .map((a) => {
      const shared = lensesOf(a).filter((l) => mine.has(l));
      const score = shared.length * 2 + (a.data.section !== current.data.section ? 1 : 0);
      return { a, shared, score };
    })
    .filter((x) => x.shared.length > 0)
    .sort((x, y) => y.score - x.score || y.a.data.date.valueOf() - x.a.data.date.valueOf())
    .slice(0, n);
}

export function readingTime(body = '') {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export const fmtDate = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('');
