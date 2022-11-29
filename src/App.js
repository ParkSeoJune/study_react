import "./App.css";
import React, { useReducer, useState } from "react";
import Student from "./Student";

const initialState = {
  count: 0,
  students: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add-student":
      const name = action.payload.name;
      const newStudent = {
        // action에서 가져온 name으로 새로운 학생객체 생성
        id: Date.now(),
        name,
        isHere: false,
      };
      return {
        count: state.count + 1,
        students: [...state.students, newStudent], // 기존 state에있던 학생들은 그대로 두고 새로운 학생 객체 추가
      };
    case "delete-student": // 삭제는 filter를 이용하여 action에서 삭제할 학생의 id와 기존 state에 있던 학생의 id를 비교하여 삭제
      return {
        count: state.count - 1,
        students: state.students.filter(
          (student) => student.id !== action.payload.id
        ),
      };
    case "mark-student": // 출석체크표시는 action에서 넘겨준 id를 기존 state에있던 학생의 id를 비교하여 name, id 등의 속성은 그대로 두고 isHere만 반대로 바꿔줌
      return {
        count: state.count,
        students: state.students.map((student) => {
          if (student.id === action.payload.id) {
            return { ...student, isHere: !student.isHere };
          }
          return student;
        }),
      };
    default:
      return state;
  }
};

function App() {
  const [name, setName] = useState("");
  const [studentsInfo, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>출석부</h1>
      <p>총 학생 수: {studentsInfo.count} </p>
      <input
        type="text"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch({ type: "add-student", payload: { name } }); // action에 type, payload가 들어있는 객체를 보냄
        }}
      >
        추가
      </button>
      {studentsInfo.students.map((student) => {
        return (
          <Student // props로 학생객체 안에 있는 정보와 dispatch함수를 넘겨줌
            name={student.name}
            key={student.id}
            dispatch={dispatch}
            id={student.id}
            isHere={student.isHere}
          />
        );
      })}
    </div>
  );
}

export default App;
