import React, { useState, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  MenuItem,
  Button,
  CircularProgress,
  styled,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { OutlineButton, RedWhiteButton } from "../elements";
import { truncate } from "../common";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import onlineStatus from "../images/online.svg";
import Account from "./Account";
import { initialState } from "../redux/reducer";
import logo from "../images/logo-white.svg";
import menu from "../images/burger-icon-light.svg";
import { Box } from "@mui/system";
import { useWallet } from "../context/wallet";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { textWhiteColor } from "./GlobelColor";

const CustomToolbar = styled(Toolbar)`
  display: flex;
  align-items: center;

  @media screen and (max-width: 480px) {
    justify-content: space-between;
  }
`;

const MobileMenu = styled("div")`
  padding: 20px;
  a,
  button {
    width: 100%;
  }
  display: none;
  @media screen and (max-width: 480px) {
    display: block;
  }
`;

// const Container = styled("div")`
//   margin: 25px 39px 0 39px;
//   @media screen and (max-width: 480px) {
//     margin: 13px 13px 0 13px;
//   }
// `;

const AppBarStyle = {
  backgroundColor: "transparent",
  boxShadow: "none",
  py: "10px",
};

const WalletConnectBTN = {
  marginTop: "0px",
  marginRight: "10px",

  "& svg": {
    color: "#CE1515",
  },
};

const Profile = {
  ml: "20px",
  marginTop: "0px",
  marginRight: "10px",
  fontWeight: "600 !important",
};
const ProfileAvatarIcon = {
  p: 0,
};
const profileMenuStyle = {
  mt: "30px",
  "&.profile_toggle": {
    position: "absolute",
  },
  "& .MuiPaper-elevation": {
    left: "unset !important",
    right: "40px",
    top: "40px !important",

    "@media (min-width: 768px)": {
      right: "40px",
    },
    "@media (min-width: 1020px)": {
      right: "40px",
    },
    "@media (min-width: 1200px)": {
      right: "135px",
    },
    "@media (min-width: 1600px)": {
      right: "230px",
    },
    "@media (min-width: 1699px)": {
      right: "270px",
    },
    "@media (min-width: 1920px)": {
      right: "175px",
    },
    "@media (min-width: 2500px)": {
      right: "470px",
    },
  },
  "& .disconnected_btn": {
    "& button": { color: "#000000" },
  },
};

const DeskHeaderLogo = styled("div")`
  img {
    width: 150px;
  }
`;

const RightSideMenuButtons = styled("div")`
  display: flex;

  justify-content: right;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const ProfileModelWrapper = styled("div")`
  display: flex;

  svg {
    color: #000000;
  }
`;

const WalletAddressBlock = styled("div")`
  background-color: rgba(225, 225, 225, 0.2);
  width: 100%;
  border: 1px solid #e1e1e1;
  padding: 10px 10px 3px;
  border-radius: 8px;

  p {
    color: #ffffff;
    background-color: #101010;
    font-weight: 600;
    font-size: 13px;
    padding: 3px 5px 1px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
  }
  img {
    margin-left: 5px;
  }
`;

const Hamburger = styled("img")`
  cursor: pointer;
  display: block;
  @media screen and (min-width: 480px) {
    display: none;
  }
`;
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor:
    "linear-gradient(162.34deg, #161A42 22.61%, rgba(22, 26, 66, 0) 118.29%)",
  marginRight: "20px",
  borderRadius: "12px",
  backgroundImage:
    "linear-gradient(\n    rgba(255, 255, 255, 0),\n    rgba(255, 255, 255, 0)\n  ),\n   linear-gradient(360deg, #212554 0.39%, rgba(81, 90, 180, 0) 100%)",
  backgroundOrigin: "border-box",
  backgroundClip: "content-box, border-box",
  border: "solid 2px transparent",
  boxShadow: "2px 1000px 1px #10133b inset",

  // "&:hover": {
  //   backgroundColor: "#e7e7e7",
  // },
  marginLeft: 0,
  width: "100%",
  display: "none",
  "@media (min-width: 1100px)": {
    display: "block",
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    color: "#8E8E8E !important",
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  height: "100%",
  "& .MuiInputBase-input": {
    // padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const MenuNavBar = styled("div")`
  flex-grow: 1;
  justify-content: right;
  display: none;
  @media (min-width: 1100px) {
    display: flex;
  }
  ,
  button {
    margin: 0px 5px;
    ${textWhiteColor}
    display: block;
    font-weight: 600;
    padding: 12px 20px;
    border-radius: 12px;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0)
      ),
      linear-gradient(360deg, #212554 0.39%, rgba(81, 90, 180, 0) 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    border: solid 2px transparent;
    box-shadow: 2px 1000px 1px #10133b inset;
  }
`;
const pages = [
  { Label: "Home", Link: "/" },
  { Label: "Explore", Link: "/explore" },
  { Label: "Collections", Link: "/" },
  { Label: "Create", Link: "/" },
];

function Header() {
  const blockchain = useSelector((state) => state?.blockchain);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleWalletConnect, walletDisconnectHandler, setGetWallet } =
    useWallet();

  const WalletMenus = () => {
    return (
      <>
        {(!blockchain.connectedAccountAddress || blockchain.wallet == null) && (
          <OutlineButton onClick={toggleWalletConnect} SX={WalletConnectBTN}>
            Connect wallet
          </OutlineButton>
        )}

        {blockchain.connectedAccountAddress && blockchain.wallet && (
          <ProfileModelWrapper>
            {false ? (
              <CircularProgress />
            ) : (
              <IconButton onClick={handleOpenUserMenu} sx={ProfileAvatarIcon}>
                <Avatar alt="Remy Sharp" src={avatar} />
              </IconButton>
            )}
            <Menu
              sx={profileMenuStyle}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchororigin={{
                vertical: "top",
                horizontal: "center",
              }}
              keepMounted
              transformorigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              className="profile_toggle"
            >
              <MenuItem>
                <WalletAddressBlock>
                  <Typography component={"p"}>
                    {truncWalletAddress}
                    <Typography component={"img"} src={onlineStatus} alt="" />
                  </Typography>
                </WalletAddressBlock>
              </MenuItem>

              <MenuItem
                className="disconnected_btn"
                onClick={handleCloseUserMenu}
              >
                <Button
                  startIcon={<LogoutIcon />}
                  onClick={walletDisconnectHandler}
                >
                  Disconnect Wallet
                </Button>
              </MenuItem>
            </Menu>

            <Link to="profile">
              <OutlineButton SX={Profile}>Profile</OutlineButton>
            </Link>
          </ProfileModelWrapper>
        )}
      </>
    );
  };

  const truncWalletAddress = useMemo(() => {
    return (
      blockchain.wallet && truncate(blockchain.connectedAccountAddress, 12)
    );
  }, [blockchain]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let avatar;

  return (
    <AppBar position="static" sx={AppBarStyle}>
      <Container className="big_desktop_container">
        <CustomToolbar container disableGutters>
          <DeskHeaderLogo>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </DeskHeaderLogo>
          <MenuNavBar>
            {pages.map((Data, ind) => (
              <Link to={Data.Link}>
                <Button key={ind} onClick={handleCloseNavMenu}>
                  {Data.Label}
                </Button>
              </Link>
            ))}
          </MenuNavBar>
          <Hamburger src={menu} alt="" onClick={() => setMenuOpen(!menuOpen)} />

          <RightSideMenuButtons>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {/* <Box sx={{ mr: "36px" }}>
              <Link to={"/"}>
                <OutlineButton onClick={handleCloseNavMenu}>
                  Explore
                </OutlineButton>
              </Link>
            </Box> */}

            <WalletMenus />
          </RightSideMenuButtons>
          <Account
            walletDisconnectHandler={walletDisconnectHandler}
            setGetWallet={setGetWallet}
            initialState={initialState}
          />
        </CustomToolbar>
      </Container>

      {menuOpen && (
        <MobileMenu>
          <Link to={"/"}>
            <OutlineButton onClick={handleCloseNavMenu}>Explore</OutlineButton>
          </Link>
          <br />
          <br />
          <WalletMenus />
        </MobileMenu>
      )}
    </AppBar>
  );
}

export default Header;
