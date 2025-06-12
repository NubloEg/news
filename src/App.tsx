import React from "react";
import s from "./App.module.css";
import Article from "./components/Article/Article";
import ArticleModal from "./components/ArticleModal/ArticleModal";
import { useLocalStorage } from "./hooks/useLocalStorage";

export interface Article {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
}

function App() {
  const [news, setNews] = useLocalStorage<Article[]>("news", []);
  const [toggleModal, setToggleModal] = React.useState(false);

  function removeArticle(articleId: string): void {
    setNews(news.filter((article) => article.id !== articleId));
  }

  return (
    <div className={s.app}>
      {toggleModal ? (
        <ArticleModal
          onClose={() => setToggleModal(false)}
          onSave={(article) => {
            setNews([article, ...news]);
          }}
        />
      ) : null}
      <h1>Страница новостей</h1>
      <button className={s.createButton} onClick={() => setToggleModal(true)}>
        Добавить новость
      </button>
      <div className={s.news}>
        {news.length > 0 ? (
          news.map((article) => (
            <Article
              key={article.id}
              {...article}
              onRemove={removeArticle}
              onChange={() => true}
            />
          ))
        ) : (
          <div className={s.empty}>
            <span>Новостей нет! Попробуйте создайте новость.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
