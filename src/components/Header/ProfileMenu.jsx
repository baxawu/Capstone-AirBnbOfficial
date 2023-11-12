import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import style from "./stylesHeader.module.scss";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import Swal from "sweetalert2";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BasicMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { currentUser, handleSignout } = useUserContext();
  console.log("currentUser", currentUser);
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  const handleSignoutSwal = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: `Hủy`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Đã đăng xuất!", "", "success");
        handleSignout();
      } else if (result.isDenied) {
        return;
      }
    });
  };

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={style.profileMenuFlex}
      >
        <MenuRoundedIcon />
        <AccountCircleRoundedIcon />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".MuiPaper-root": {
            minWidth: "200px",
            borderRadius: "1rem",
            boxShadow: "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
          },
        }}
      >
        {currentUser ? ( // Check if the user is logged in
          <>
            <img src="./img/logo.png" className={style.jss5} />
            <Typography
              variant="h3"
              sx={{ fontSize: 20, fontWeight: 500, padding: 2 }}
            >
              Tài Khoản: {currentUser?.user?.name} {/* Display the user's name */}
            </Typography>
            {currentUser?.user?.role === "USER" ? (
              <Typography
                variant="h3"
                sx={{ fontSize: 20, fontWeight: 500, padding: 2 }}
              >
                <a href="https://admin-airbnb.vercel.app/admin">Chuyển sang trang admin</a>
              </Typography>
            ) : (
              <></>
            )}

            <MenuItem onClick={handleClose} className={style.menuItems}>
              <Typography variant="h3" sx={{ fontSize: 16, fontWeight: 500 }}>
                <a onClick={handleSignoutSwal}>Đăng Xuất</a>
              </Typography>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem className={style.menuItems} onClick={handleClose}>
              <a href="/sign-up" className={style.text}>
                Sign Up
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose} className={style.menuItems}>
              <a href="/sign-in" className={style.text}>
                Log In
              </a>
            </MenuItem>
          </>
        )}
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--grey)",
            width: "100%",
          }}
        />
      </Menu>
    </div>
  );
}
