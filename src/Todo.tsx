import { FunctionComponent, memo, useMemo } from "react";
import { ITask } from "./interfaces";

interface Props {
  todolist: ITask[];
  handleDelete: Function;
  EditItem: Function;

}

const Todo: FunctionComponent<Props> = ({
  todolist,
  handleDelete,
  EditItem,
}) => {
  return (
    <>
      {todolist?.map((item, index) => {
        return (
          <>
            <h3 key={index}>
              {item?.taskName} {item?.deadline}
            </h3>
            <button onClick={() => handleDelete(item?.id)}>Delete</button>
            <button onClick={() => EditItem(item?.id)}>Edit</button>
          </>
        );
      })}
    </>
  );
};

export default memo(Todo);
