import React from "react";
import type { Article } from "../../App";
import s from "./ArticleModal.module.css";

export default function ArticleModal({
  onSave,
  onClose,
}: {
  onSave: (article: Article) => void;
  onClose: VoidFunction;
}) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState(false);

  function getFullDate(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${formater(day)}-${formater(month)}-${formater(year)} ${formater(
      hour
    )}:${formater(minutes)}`;
  }

  function formater(date: number) {
    return date > 9 ? date : `0${date}`;
  }

  function onSaveClick() {
    const article: Article = {
      id: Date.now().toString(),
      title: title,
      content: content,
      publishedAt: getFullDate(),
    };

    if (title.trim() === "" || content.trim() === "") {
      setError(true);
      return;
    }
    onSave(article);
    onClose();
  }

  return (
    <div className={s.modal} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={s.wrapper}>
        <h3>Создать новость</h3>
        <input
          className={error ? s.error : undefined}
          onChange={(e) => {
            setError(false);
            setTitle(e.target.value);
          }}
          value={title}
        />
        <textarea
          className={error ? s.error : undefined}
          style={{ resize: "none", minHeight: "140px" }}
          onChange={(e) => {
            setError(false);
            setContent(e.target.value);
          }}
          value={content}
        ></textarea>
        <button onClick={onSaveClick}>Сохранить</button>
      </div>
    </div>
  );
}
