export interface Advice {
  uid: string;
  title: string;
  postedArticle: string;
}

export type AdviceSummary = Pick<Advice, 'uid' | 'title'>;
