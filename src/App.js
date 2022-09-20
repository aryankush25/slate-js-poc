import { memo, useCallback, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import "./styles.css";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }]
  }
];

const ChildEditor = memo(({ id, onChange }) => {
  const [editor] = useState(() => withReact(createEditor()));
  // const initialValue = useReducer((state) => (return state.posts.initialValues[id]))

  console.log("#### editor", { id, editor });

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(txt) => onChange(txt, id)}
    >
      <Editable style={{ border: "solid 1px black" }} />
    </Slate>
  );
});

export default function App() {
  const [val, setVal] = useState(["0-slate"]);
  const [mappedValues, setMappedValues] = useState({ "0-slate": initialValue });

  const onChange = useCallback((value, id) => {
    setMappedValues((values) => ({ ...values, [id]: value }));
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <button
        onClick={() => {
          const newId = parseInt(val[val.length - 1]) + 1 + "-slate";

          setVal([...val, newId]);
          setMappedValues({ ...mappedValues, [newId]: initialValue });
        }}
      >
        Add
      </button>
      <h2>Start editing to see some magic happen!</h2>
      {val.map((id, idx) => {
        console.log("Loop", idx);
        return <ChildEditor key={id} id={id} onChange={onChange} />;
      })}
    </div>
  );
}
