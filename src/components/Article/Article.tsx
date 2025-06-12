import type { Article } from "../../App";
import s from "./Article.module.css";

interface Props extends Article {
  onRemove: (articleId: string) => void;
  onChange: () => void;
}

export default function Article({
  id,
  content,
  publishedAt,
  title,
  onRemove,
}: Props) {
  return (
    <div className={s.article}>
      <h3>{title}</h3>
      <p>{content}</p>
      <div className={s.footer}>
        <span>{publishedAt}</span>
        <div>
          <button onClick={() => localStorage.getItem}>Редактировать</button>
          <button onClick={() => onRemove(id)}>Удалить пост</button>
        </div>
      </div>
    </div>
  );
}
