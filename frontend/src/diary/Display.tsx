import { ChangeEvent, FC } from "react";

type Props = {
  tmpGood: string;
  handleTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleCancelBtnClick: () => void;
  handleSaveBtnClick: () => void;
}

export const Display: FC<Props> = props => {
  const { tmpGood, handleTextChange, handleCancelBtnClick, handleSaveBtnClick } = props;
  return (
    <div>
      <textarea onChange={handleTextChange} value={tmpGood}></textarea>
      <p>{tmpGood.length}</p>
      <button onClick={handleCancelBtnClick}>キャンセル</button>
      <button onClick={handleSaveBtnClick}>保存</button>
    </div>
  )
}