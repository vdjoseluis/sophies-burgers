import { useState } from "react";

const useForm = () => {
  const [form, setForm] = useState({});

  const changed = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };
  return { form, changed, setForm };
};

export default useForm;
