import { FormEvent } from "react";
import { Input } from "../Input";

const ignore = (e: FormEvent) => {
  e.preventDefault();
};

export const Form = () => {
  return (
    <form onSubmit={ignore}>
      <Input label="Date" type="date" />
      <Input label="Time Stamp" type="number" />

      <select>
        <option>ms</option>
        <option>s</option>
      </select>
    </form>
  );
};
