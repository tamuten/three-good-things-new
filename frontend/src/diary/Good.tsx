import { useState, useEffect, FC, ChangeEvent } from "react";
import { Display } from "./Display";
import { Edit } from "./Edit";

type Props = {
  good: string;
  onSave: (good: string, num: number) => void;
  num: number;
}

export const Good: FC<Props> = (props) => {
  const { good, onSave, num } = props;
  const [tmpGood, setTmpGood] = useState<string>(good);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleClick = () => setEditMode(!editMode);
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTmpGood(() => e.target.value);
  };

  useEffect(() => {
    setTmpGood(good);
  }, [props]);

  const handleCancelBtnClick = (): void => {
    setTmpGood(() => good);
    handleClick();
  };

  const handleSaveBtnClick = (): void => {
    onSave(tmpGood, num);
    handleClick();
  };

  return (
    <>
      {editMode ? (
        <Display
          tmpGood={tmpGood}
          handleTextChange={handleTextChange}
          handleCancelBtnClick={handleCancelBtnClick}
          handleSaveBtnClick={handleSaveBtnClick}
        />
      ) : (
        <Edit good={good} handleClick={handleClick} />
      )}
    </>
  );
};
