import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button, Input, Checkbox } from "../../index";
import { Header } from "semantic-ui-react";

const Fieldsgenerate = (FormComp) => {
  return function FieldComp({ name = "", className, ...props }) {
    const methods = useFormContext();
    const { control } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        render={({ fieldState, field }) => {
          const { error } = fieldState;
          return (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "5px 30px",
                }}
              >
                <FormComp
                  {...field}
                  {...props}
                  className={`custom-input ${className}`}
                  fullWidth
                />
                {error?.message && (
                  <Header
                    as={"h6"}
                    style={{
                      color: "red",
                      fontSize: "12px",
                      padding: "5px 7px",
                      top: 0,
                      marginTop: "0px",
                    }}
                  >
                    {error.message}
                  </Header>
                )}
              </div>
            </>
          );
        }}
        {...methods}
      />
    );
  };
};
const Fields = {
  Input: Fieldsgenerate(Input),
  Button: Fieldsgenerate(Button),
  Checkbox: Fieldsgenerate(Checkbox),
};

export default Fields;
