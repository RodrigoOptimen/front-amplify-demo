import { useState } from "react";

export const useForm =  <T extends Record<string, unknown>>(initialForm: T)  => {
  const [formState, setFormState] = useState<T>(initialForm);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = e.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const onResetForm = () => {
    setFormState( initialForm );
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm
  };
};
