import {
  PersonIcon,
  HomeIcon,
  AvatarIcon,
  EnterIcon,
  MagnifyingGlassIcon,
  AccessibilityIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

export const navLinks = [
  {
    name: "home",
    link: "/",
    icon: HomeIcon,
  },
  {
    name: "search",
    link: "/search",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "users",
    link: "/users",
    icon: AccessibilityIcon,
  },
];

export const authLinks = [
  {
    name: "sign up",
    link: "/sign-up",
    icon: PersonIcon,
  },
  {
    name: "sign-in",
    link: "/api/auth/signin",
    icon: EnterIcon,
  },
];

export const userLinks = [
  {
    name: "profile",
    link: "/profile",
    icon: AvatarIcon,
  },
  // {
  //   name: "notifications",
  //   link: "/notifications",
  //   icon: EnvelopeClosedIcon,
  // },
  // {
  //   name: "create post",
  //   link: "/create-post",
  //   icon: Pencil2Icon,
  // },
  // {
  //   name:'friends',
  //   link:'/user/friends',

  // }
  // {
  //   name: "bookmarks",
  //   link: "/bookmarks",
  //   icon: BookmarkIcon,
  // },
];

export const placeholders = {
  profilePicturePlaceholder:
    "https://i.pinimg.com/280x280_RS/d8/ea/7b/d8ea7b37641ce7b201f264041d300ea1.jpg",
  backgroundImagePlaceholder:
    "https://i.pinimg.com/736x/1b/de/6e/1bde6e85c5e1665e0c4094c0cf0e2362.jpg",
};
