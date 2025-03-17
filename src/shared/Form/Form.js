import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const Form = ({
  defaultValues,
  validateSchemas,
  onSubmit,
  style,
  children,
  context,
  ...otherProps
}) => {
  const Schema = validateSchemas;

  const { handleSubmit, ...method } = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
    ...otherProps,
  });

  const handleSubmitData = (data) => {
    onSubmit(data);
    console.log(data, "data");
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(handleSubmitData)} style={{ ...style }}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
