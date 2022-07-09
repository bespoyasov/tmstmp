import { FormEvent } from "react";

const ignore = (e: FormEvent) => {
  e.preventDefault();
};

export const Form = () => {
  return (
    <form onSubmit={ignore}>
      <input type="date" />
      <input type="number" />
      <select>
        <option>ms</option>
        <option>s</option>
      </select>
    </form>
  );
};
