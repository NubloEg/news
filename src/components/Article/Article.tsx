import type { Article } from "../../App";
import s from "./Article.module.css";
import pen from "../../assets/pen.svg";
import trash from "../../assets/trash.svg";

interface Props extends Article {
  onRemove: (articleId: string) => void;
  onChange: (articleId: string) => void;
}

export default function Article({
  id,
  content,
  publishedAt,
  title,
  onRemove,
  onChange,
}: Props) {
  return (
    <div className={s.article}>
      <div className={s.header}>
        <h3>{title}</h3>
        <div className={s.actions}>
          <img
            className={s.pen}
            onClick={() => onChange(id)}
            src={pen}
            width="24px"
            alt="pen"
          />
          <img
            className={s.trash}
            onClick={() => onRemove(id)}
            src={trash}
            width="24px"
            alt="trash"
          />
        </div>
      </div>
      <p className={s.content}>{content}</p>
      <div className={s.footer}>
        <span>{publishedAt}</span>
      </div>
    </div>
  );
}
