import FormProvider from "../hook-form/FormProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import RHFTextField from "../hook-form/RHFTextField";
import Button from "@mui/material/Button";
import RHFAutoComplete from "../hook-form/RHFAutoComplete";
import { PropTypes } from "prop-types";

const MEMBERS = ["Name 1", "Name 2", "Name 3", "Name 4", "Name 5"];

const Schema = Yup.object().shape({
  title: Yup.string().required("Email is required"),
  members: Yup.array().min(2, "Must have at least 2 members"),
});

const CreateGroupForm = ({ handleClose }) => {
  const defaultValues = {
    title: "",
    members: [],
  };
  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
      reset();
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name={"title"} label={"Group title"} />
        <RHFAutoComplete
          name="members"
          label={"Members"}
          multiple
          freeSolo
          options={MEMBERS.map((member) => member)}
          ChipProps={{ size: "medium" }}
        />
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

CreateGroupForm.propTypes = {
  handleClose: PropTypes.func,
};

export default CreateGroupForm;
