import React from "react";
import type { Article } from "../../App";
import s from "./ArticleModal.module.css";
import UIButton from "../ui/UIButton/UIButton";

export default function ArticleModal({
  article,
  onSave,
  onClose,
}: {
  article?: Article;
  onSave: (article: Article) => void;
  onClose: VoidFunction;
}) {
  const [title, setTitle] = React.useState(article?.title ?? "");
  const [content, setContent] = React.useState(article?.content ?? "");
  const [errorTitle, setErrorTitle] = React.useState(false);
  const [errorContent, setErrorContent] = React.useState(false);

  function getFullDate(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${formater(day)}.${formater(month)}.${formater(year)} ${formater(
      hour
    )}:${formater(minutes)}`;
  }

  function formater(date: number) {
    return date > 9 ? date : `0${date}`;
  }

  function onSaveClick() {
    const newArticle: Article = {
      id: article?.id ?? Date.now().toString(),
      title: title,
      content: content,
      publishedAt: getFullDate(),
    };

    const trimTitle = title.trim() === "";
    const trimContent = content.trim() === "";

    if (trimTitle || trimContent) {
      setErrorTitle(trimTitle);
      setErrorContent(trimContent);

      return;
    }

    onSave(newArticle);
    onClose();
  }

  return (
    <div className={s.modal} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={s.wrapper}>
        <h3>Создать новость</h3>
        <input
          className={`${s.input} ${errorTitle ? s.error : ""}`}
          onChange={(e) => {
            setErrorTitle(false);
            setTitle(e.target.value);
          }}
          value={title}
        />
        <textarea
          className={`${s.textarea} ${errorContent ? s.error : ""}`}
          onChange={(e) => {
            setErrorContent(false);
            setContent(e.target.value);
          }}
          value={content}
        ></textarea>
        <UIButton variant="create" onClick={onSaveClick}>
          Сохранить
        </UIButton>
      </div>
    </div>
  );
}
