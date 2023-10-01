export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
}
export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}
