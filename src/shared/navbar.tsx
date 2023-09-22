import React, { useState, Fragment, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { Popover } from "@mui/material";
import { ReactComponent as Logo } from "@assets/Logo.svg";
import { ReactComponent as CartIcon } from "@assets/icons/frank-shopping-bag.svg";
import PersonIcon from "@assets/icons/person.png";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import CustomButton from "./customButton";
import { useLocation, useNavigate } from "react-router-dom";
import { IsAuthenticated, IsLoggedIn, Logout } from "./utils/authService";
import SeperatorLine from "./seperator/seperatorLine";
import { STORAGE } from "./const";
import LazyImage from "./lazyImage";

export interface IFooterProps {
  isShow?: boolean;
}

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [image, setImage] = React.useState();
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const _data: any = localStorage.getItem(STORAGE);
  useEffect(() => {
    const data = JSON.parse(_data);
    setImage(data?.image_url);
    console.log("localStorage.getItem(STORAGE) ==", data);
  }, []);
  const handleClickDropdown = (event: any) => {
    setAnchorEl(event.currentTarget);
    setIsDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
    setIsDropdownOpen(false);
  };
  const handleLogout = () => {
    Logout().then(() => {
      navigate("/");
    });
  };
  return (
    <>
      <Typography
        variant="h6"
        // component="div"
        className={`!ml-auto rounded-full ${
          isDropdownOpen ? " ease-in duration-300  " : "bg-white"
        } flex items-center justify-center`}
        aria-describedby={"simple-popover"}
        onClick={handleClickDropdown}
      >
        <div className="cursor-pointer">
          {image ? (
            <LazyImage
              src={image}
              // size={"small"}
              className="h-10 w-10   border-2 rounded-full"
            />
          ) : (
            <Avatar sizes={"small"} src={PersonIcon} />
          )}

          {/* <Avatar sizes="small" src={PersonIcon} /> */}
          {/* {isDropdownOpen ? (
            <RxDropdownMenu height={20} width={20} fill="#000" />
          ) : (
            <RxDropdownMenu height={20} width={20} fill="#000" />
          )} */}
        </div>
      </Typography>
      <Popover
        id={"simple-popover"}
        open={isDropdownOpen}
        anchorEl={anchorEl}
        onClose={handleCloseDropdown}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="w-52">
          <div className="flex flex-col w-full my-2 px-3">
            <p
              className="text-xs font-medium text-black-900 pl-3 pt-2 cursor-pointer"
              onClick={() => {
                setIsDropdownOpen(false);
                navigate("/transactionHistory");
              }}
            >
              Transaction History
            </p>
            <SeperatorLine className="!border-gray-800 px-3"></SeperatorLine>
            <p
              className="text-xs font-medium text-black-900 pl-3 pt-2 cursor-pointer"
              onClick={() => {
                setIsDropdownOpen(false);
                navigate("/profileSetting");
              }}
            >
              Profile Settings
            </p>
            <SeperatorLine className="!border-gray-800"></SeperatorLine>
            <p
              className="text-xs font-medium text-black-900 pl-3 pt-2 cursor-pointer"
              onClick={() =>{ setIsDropdownOpen(false);
                navigate("/paymentMethod");
              } }
            >
              Payment Method
            </p>
            <SeperatorLine className="!border-gray-800"></SeperatorLine>
            <p
              // onClick={() => setIsOpenSignoutPopup(true)}
              className="text-xs font-medium text-black-900 pl-3 pt-2 cursor-pointer"
              onClick={() => {
                setIsDropdownOpen(false);
                navigate("/Setting");
              }}
            >
              Settings
            </p>
            <SeperatorLine className="!border-gray-800"></SeperatorLine>
            <p
              className="text-xs font-medium text-black-900 pl-3 pt-2 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </p>
          </div>
        </div>
        <div className="flex justify-around items-center bg-grey-200"></div>
      </Popover>
    </>
    // <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
    //   <MenuHandler>
    //     <Button
    //       variant="text"
    //       color="blue-gray"
    //       className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
    //     >
    //       <Avatar
    //         variant="circular"
    //         size="sm"
    //         alt="candice wu"
    //         className="border border-blue-500 p-0.5"
    //         src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
    //       />
    //       <ChevronDownIcon
    //         strokeWidth={2.5}
    //         className={`h-3 w-3 transition-transform ${
    //           isMenuOpen ? "rotate-180" : ""
    //         }`}
    //       />
    //     </Button>
    //   </MenuHandler>
    //   <MenuList className="p-1">
    //     {profileMenuItems.map(({ label, icon }, key) => {
    //       const isLastItem = key === profileMenuItems.length - 1;
    //       return (
    //         <MenuItem
    //           key={label}
    //           onClick={closeMenu}
    //           className={`flex items-center gap-2 rounded ${
    //             isLastItem
    //               ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
    //               : ""
    //           }`}
    //         >
    //           {React.createElement(icon, {
    //             className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
    //             strokeWidth: 2,
    //           })}
    //           <Typography
    //             as="span"
    //             variant="small"
    //             className="font-normal"
    //             color={isLastItem ? "red" : "inherit"}
    //             onClick={handleLogout}
    //           >
    //             {label}
    //           </Typography>
    //         </MenuItem>
    //       );
    //     })}
    //   </MenuList>
    // </Menu>
  );
}

// nav list menu
const navListMenuItems = [
  {
    title: "@material-tailwind/html",
    description:
      "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
  },
  {
    title: "@material-tailwind/react",
    description:
      "Learn how to use @material-tailwind/react, packed with rich components for React.",
  },
  {
    title: "Material Tailwind PRO",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid"
        >
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "Home",
    icon: UserCircleIcon,
    link: "/",
  },
  {
    label: "My Orders",
    icon: CubeTransparentIcon,
    link: "/myOrders",
  },
  {
    label: "My Bookings",
    icon: CodeBracketSquareIcon,
    link: "#",
  },
  {
    label: "My Favorites",
    icon: CodeBracketSquareIcon,
    link: "/favourites",
  },
  {
    label: "Messages",
    icon: CodeBracketSquareIcon,
    link: "/messages",
  },
];
const guestNavListItems = [
  {
    label: "Home",
    icon: UserCircleIcon,
    link: "/",
  },
  {
    label: "My Favorites",
    icon: CodeBracketSquareIcon,
    link: "/favourites",
  },
];

function NavList({ handleNavToggle }: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarItems, setNavbarItems] = useState(guestNavListItems);
  const handleNavigation = (link: string) => {
    navigate(link);
    handleNavToggle();
  };
  useEffect(() => {
    setNavbarItems(IsLoggedIn() ? navListItems : guestNavListItems);
  }, [IsLoggedIn()]);
  return (
    <ul className="mb-4 mt-5 gap-2  flex flex-col    lg:flex-row lg:items-center ">
      {/* <NavListMenu /> */}
      <>
        {navbarItems.map(({ label, icon, link }, key) => (
          <h6
            onClick={() => handleNavigation(link)}
            className={`lg:ml-4 sm:mx-0 md:mx-0 whitespace-nowrap  sm:text-black-900 text-black-900 sm:text-left md:text-left hov-border ${
              location?.pathname === link ? "half-border" : null
            }`}
          >
            {label}
          </h6>
        ))}
        {!IsLoggedIn() ? (
          <div className="inline-flex ml-auto space-x-2 items-center  lg:hidden">
            <CustomButton
              label={"Login"}
              type={"submit"}
              isLoading={false}
              variant={"outlined"}
              styleClass={"btn-white "}
              handleButtonClick={() => handleNavigation("/login")}
            />
            <CustomButton
              label={"Sign Up"}
              type={"submit"}
              isLoading={false}
              variant={"outlined"}
              styleClass={"btn-black "}
              handleButtonClick={() => handleNavigation("/signup")}
            />

            {/* <ProfileMenu /> */}
          </div>
        ) : null}
      </>
    </ul>
  );
}

export default function NavBar({ isShow }: IFooterProps) {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const handleClickDropdown = (event: any) => {
    setAnchorEl(event.currentTarget);
    setIsDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
    setIsDropdownOpen(false);
  };
  const navigate = useNavigate();
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 1100 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto fixed !z-[100] !bg-white p-2 lg:px-12 md:px-6 sm:px-6 rounded-none max-w-none">
      <div className="relative mx-auto flex items-center text-black-900">
        {/* <IconButton size="sm" variant="text"> */}
        <div className="inline-flex">
          <Logo
            onClick={() => navigate("/")}
            className="w-9/12 cursor-pointer"
          />
        </div>
        {/* </IconButton> */}
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block min-w-[300px]">
          <NavList />
        </div>

        <div className="inline-flex ml-auto space-x-2 items-center ">
          {IsLoggedIn() ? (
            <IconButton
              className="mr-4"
              size="lg"
              variant="text"
              onClick={() => navigate("/cartManagement")}
            >
              <CartIcon className="h-8 w-8" />
            </IconButton>
          ) : null}
          {!IsLoggedIn() ? (
            <>
              <CustomButton
                label={"Login"}
                type={"submit"}
                isLoading={false}
                handleButtonClick={() => navigate("/login")}
                variant={"outlined"}
                styleClass={"btn-white sm:hidden md:hidden "}
              />
              <CustomButton
                label={"Sign Up"}
                type={"submit"}
                isLoading={false}
                variant={"outlined"}
                styleClass={"btn-black  sm:hidden md:hidden"}
                handleButtonClick={() => navigate("/signup")}
              />
            </>
          ) : null}

          {IsLoggedIn() && <ProfileMenu />}
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto sm:ml-0 md:ml-0 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
      </div>
      <MobileNav open={isNavOpen} className="">
        <NavList handleNavToggle={toggleIsNavOpen} />
      </MobileNav>
    </Navbar>
  );
}
