import FormProvider from "../hook-form/FormProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import RHFTextField from "../hook-form/RHFTextField";
import Button from "@mui/material/Button";
import { useCallback } from "react";
import { faker } from "@faker-js/faker";

const Schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  about: Yup.string().required("About is required"),
  avatarUrl: Yup.string().required("Avatar is required").nullable(true),
});

const ProfileForm = () => {
  const defaultValues = {
    name: "",
    about: "",
  };

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const value = watch();
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatarUrl", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    try {
      console.log(data);
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
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar
            sx={{ height: 100, width: 100 }}
            src={faker.image.avatar()}
            alt={faker.name.fullName()}
          />
        </Stack>

        <RHFTextField
          name={"name"}
          label={"Name"}
          helperText={"This name is visible to you contacts."}
        />
        <RHFTextField
          multiline
          rows={3}
          maxRows={5}
          name={"about"}
          label={"About"}
        />
        <Stack direction={"row"} justifyContent={"flex-end"}>
          <Button color="primary" size="lg" type="submit" variant={"outlined"}>
            Save
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
