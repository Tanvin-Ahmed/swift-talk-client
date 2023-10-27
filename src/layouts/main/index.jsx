import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Navigate, Outlet } from "react-router-dom";
import Image from "../../components/Image";
import Logo from "../../assets/Images/logo.png";

const userIsAuthenticated = true;

const AuthLayout = () => {
  if (userIsAuthenticated) {
    return <Navigate to={"/app"} />;
  }
  return (
    <>
      <Container sx={{ mt: 6 }} maxWidth="sm">
        <Stack sx={{ width: "100%" }} spacing={5}>
          <Stack
            sx={{ width: "100%" }}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image
              style={{ height: 120, width: 120 }}
              src={Logo}
              alt={"logo"}
            />
          </Stack>
        </Stack>
        <Outlet />
      </Container>
    </>
  );
};

export default AuthLayout;
