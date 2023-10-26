import { Controller, useFormContext } from "react-hook-form";
import { PropTypes } from "prop-types";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const RHFAutoComplete = ({ name, helperText, label, ...rest }) => {
  const { control, setValue } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          fullWidth
          onChange={(e, newValue) =>
            setValue(name, newValue, { shouldValidate: true })
          }
          error={!!error}
          helperText={error ? error.message : helperText}
          {...rest}
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error.message : helperText}
              {...params}
            />
          )}
        />
      )}
    />
  );
};

RHFAutoComplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};

export default RHFAutoComplete;
