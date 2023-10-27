import {
  ChatCircleDots,
  Gear,
  GearSix,
  Phone,
  SignOut,
  User,
  Users,
} from "phosphor-react";

export const Profile_Menu = [
  {
    title: "Profile",
    icon: <User />,
    link: "/profile",
  },
  {
    title: "Settings",
    icon: <Gear />,
    link: "/user-settings",
  },
  {
    title: "Profile",
    icon: <SignOut />,
    link: "/auth/login",
  },
];

export const Nav_Buttons = [
  {
    index: 0,
    icon: <ChatCircleDots />,
    link: "/app",
  },
  {
    index: 1,
    icon: <Users />,
    link: "/group",
  },
  {
    index: 2,
    icon: <Phone />,
    link: "/call",
  },
];

export const Nav_Setting = [
  {
    index: 3,
    icon: <GearSix />,
  },
];
