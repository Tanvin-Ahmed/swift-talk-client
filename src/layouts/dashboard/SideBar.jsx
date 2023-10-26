import { useTheme } from "@mui/material/styles";
import { Gear } from "phosphor-react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";

import Logo from "../../assets/Images/logo.png";
import { Nav_Buttons, Profile_Menu } from "../../data/menu_data";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";
import ModeSwitch from "../../components/ModeSwitch";
import { useEffect, useState } from "react";
import Image from "../../components/Image";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { onToggleMode, themeMode } = useSettings();

  const [selected, setSelected] = useState("/app");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100vh",
        width: 100,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        sx={{ width: "100%", height: "100%" }}
        justifyContent={"space-between"}
        spacing={3}
      >
        <Stack direction={"column"} spacing={4} alignItems={"center"}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: 64,
              width: 64,
              borderRadius: 1.5,
            }}
          >
            <Image src={Logo} alt="logo" />
          </Box>

          <Stack
            direction={"column"}
            alignItems={"center"}
            sx={{ width: "max-content" }}
            spacing={3}
          >
            {Nav_Buttons.map((button) =>
              button.link === selected ? (
                <Box
                  key={button.index}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    onClick={() => navigate(button.link)}
                    sx={{ width: "max-content", color: "#fff" }}
                  >
                    {button.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  key={button.index}
                  onClick={() => navigate(button.link)}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#000"
                        : theme.palette.text.primary,
                  }}
                >
                  {button.icon}
                </IconButton>
              )
            )}
            <Divider sx={{ width: "48px" }} />

            {selected === "/settings" ? (
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
              >
                <IconButton
                  onClick={() => navigate("/settings")}
                  sx={{ width: "max-content", color: "#fff" }}
                >
                  <Gear />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => navigate("/settings")}
                sx={{
                  width: "max-content",
                  color:
                    theme.palette.mode === "light"
                      ? "#000"
                      : theme.palette.text.primary,
                }}
              >
                <Gear />
              </IconButton>
            )}
          </Stack>
        </Stack>
        <Stack direction={"column"} alignItems={"center"} spacing={4}>
          <ModeSwitch
            onChange={() => onToggleMode()}
            checked={themeMode === "dark"}
          />
          <IconButton
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar src={faker.image.avatar()} />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el) => (
                <MenuItem key={el.title} onClick={handleClose}>
                  <Stack
                    direction="row"
                    sx={{ width: 100 }}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <span>{el.title}</span>
                    {el.icon}
                  </Stack>
                </MenuItem>
              ))}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
