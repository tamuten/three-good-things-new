import { FC } from "react";

type Props = {
  good: string;
  handleClick: () => void;
}

export const Edit: FC<Props> = (props) => {
  const { good, handleClick } = props;
  return (
    <div className="edit">
      <a onClick={handleClick}>{good ? good : "タップして編集する"}</a>
    </div>
  );
}