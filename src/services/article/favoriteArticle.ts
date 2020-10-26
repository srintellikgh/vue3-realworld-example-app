import { ComputedRef } from 'vue'
import { request } from '../index'

async function postFavoriteArticle (slug: string) {
  return request.post<ArticleResponse>(`/articles/${slug}/favorite`).then(res => res.article)
}

async function deleteFavoriteArticle (slug: string) {
  return request.delete<ArticleResponse>(`/articles/${slug}/favorite`).then(res => res.article)
}

interface useFavoriteArticleProps {
  isFavorited: ComputedRef<boolean>
  articleSlug: ComputedRef<string>
  updateArticle: (newArticle: Article) => void
}

export const useFavoriteArticle = ({ isFavorited, articleSlug, updateArticle }: useFavoriteArticleProps) => {
  const onFavoriteArticle = async () => {
    let newArticle: Article
    if (isFavorited.value) {
      newArticle = await deleteFavoriteArticle(articleSlug.value)
    } else {
      newArticle = await postFavoriteArticle(articleSlug.value)
    }
    updateArticle(newArticle)
  }

  return { onFavoriteArticle }
}
