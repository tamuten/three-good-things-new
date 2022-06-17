import { useState, useEffect, FC, ChangeEvent } from "react";

type Props = {
  good: string;
  onSave: (good: string, num: number) => void;
  num: number;
}

export const Good: FC<Props> = (props) => {
  const { good, onSave, num } = props;
  const [tmpGood, setTmpGood] = useState(good);
  const [editMode, setEditMode] = useState(false);

  const handleClick = () => setEditMode(!editMode);
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTmpGood(() => e.target.value);
  };

  useEffect(() => {
    setTmpGood(good);
  }, [props]);

  const handleCancelBtnClick = () => {
    setTmpGood(() => good);
    handleClick();
  };

  const handleSaveBtnClick = () => {
    onSave(tmpGood, num);
    handleClick();
  };

  return (
    <>
      {editMode ? (
        <div>
          <textarea onChange={handleTextChange} value={tmpGood}></textarea>
          <p>{tmpGood.length}</p>
          <button onClick={handleCancelBtnClick}>キャンセル</button>
          <button onClick={handleSaveBtnClick}>保存</button>
        </div>
      ) : (
        <div className="edit">
          <a onClick={handleClick}>{good ? good : "タップして編集する"}</a>
        </div>
      )}
    </>
  );
};
