import React from "react";
import s from "./App.module.css";
import Article from "./components/Article/Article";
import ArticleModal from "./components/ArticleModal/ArticleModal";
import { useLocalStorage } from "./hooks/useLocalStorage";
import UIButton from "./components/ui/UIButton/UIButton";

export interface Article {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
}

function App() {
  const [news, setNews] = useLocalStorage<Article[]>("news", []);
  const [toggleModal, setToggleModal] = React.useState<{
    isOpen: boolean;
    article: Article | undefined;
  }>({ isOpen: false, article: undefined });

  function onRemoveArticle(articleId: string): void {
    setNews(news.filter((article) => article.id !== articleId));
  }

  function onChangeArticle(articleId: string): void {
    const article = news.find((artcile) => artcile.id === articleId);

    if (!article) {
      throw new Error("Такой записи нет");
    }

    setToggleModal({ isOpen: true, article });
  }

  function onSaveArticle(newArticle: Article): void {
    const filteredNews = news.filter((article) => article.id !== newArticle.id);
    setNews([newArticle, ...filteredNews]);
  }

  return (
    <div className={s.app}>
      <h1>Страница новостей</h1>
      <UIButton
        className={s.createButton}
        variant="add"
        onClick={() =>
          setToggleModal((data) => {
            return { ...data, isOpen: true };
          })
        }
      >
        Добавить новость
      </UIButton>
      <div className={s.news}>
        {news.length > 0 ? (
          news.map((article) => (
            <Article
              key={article.id}
              {...article}
              onRemove={onRemoveArticle}
              onChange={onChangeArticle}
            />
          ))
        ) : (
          <div className={s.empty}>
            <span>Новостей нет! Попробуйте создайте новость.</span>
          </div>
        )}
      </div>
      {toggleModal.isOpen ? (
        <ArticleModal
          onClose={() => setToggleModal({ isOpen: false, article: undefined })}
          onSave={onSaveArticle}
          article={toggleModal.article}
        />
      ) : null}
    </div>
  );
}

export default App;
