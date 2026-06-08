export interface Advice {
  uid: string;
  title: string;
  postedArticle: string;
}

/** Widok listy, wystarczająca ilość infomacji, żeby wyświetlić lewy panel */
export type AdviceSummary = Pick<Advice, 'uid' | 'title'>;
