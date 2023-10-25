import { Controller, useFormContext } from "react-hook-form";
import { PropTypes } from "prop-types";
import TextField from "@mui/material/TextField";

const RHFTextField = ({ name, helperText, ...rest }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error ? error.message : helperText}
          {...rest}
        />
      )}
    />
  );
};

RHFTextField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default RHFTextField;
