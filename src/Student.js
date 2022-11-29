import React from "react";

const Student = ({ name, dispatch, id, isHere }) => {
  return (
    <div>
      <span
        style={{
          textDecoration: isHere ? "line-through" : "none",
          color: isHere ? "gray" : "black",
        }}
        onClick={() => {
          // 학생의 이름을 클릭하면 action에 아래와 같은 정보를 넘김
          dispatch({ type: "mark-student", payload: { id } });
        }}
      >
        {name}
      </span>
      <button
        onClick={() => {
          dispatch({ type: "delete-student", payload: { id } });
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default Student;
