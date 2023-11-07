import React from "react";
import style from "./stylesHeader.module.scss";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LanguageIcon from "@mui/icons-material/Language";
import BasicMenu from "./ProfileMenu";
import {
  Button,
  ButtonBase,
  Container,
  FormControl,
  Grid,
  Modal,
  NativeSelect,
  Typography
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from "../../contexts/UserContext/UserContext";




export default function Header() {

  const navigate = useNavigate()
  const pages = ["Nơi Ở", "Trải Nghiệm", "Trải nghiệm trực tuyến"];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (!element) {
      return
    }
    element.scrollIntoView({ behavior: "smooth" })
  }


  return (
    <div className={style.navbar}>
      <a href="/">
      <img src="./img/logo.png" alt="logo" className={style.navbarLogo} />
      </a>
       <Grid container item justifyContent="center" alignItems="center" sx={{ display: { xs: 'none', lg: 'flex' } }} lg={5}>
              {pages.map((page, index) => {
                return (
                  <a key={index} className={style.jss3} onClick={() => handleScroll(index)}>
                    <Typography
                      variant="h4"
                      sx={{ fontSize: 14, fontWeight: 500 }}
                    > {page}
                    </Typography>
                  </a>
                )
              })}
            </Grid>
      {/* <div className={style.searchBar}>
        <div className={style.searchBarText}>Anywhere</div>
        <div className={style.searchBarText}>Any Week</div>
        <div className={style.searchBarText2}>Add guests</div>
        <div className={style.searchIconDiv}>
          <SearchRoundedIcon className={style.searchIcon} />
        </div>
      </div> */}
      <div className={style.profileContainer}>
        <div className={style.airbnbYourHome}>Airbnb your home</div>
        <div className="profile-div">
          <BasicMenu />
        </div>
      </div>
    </div>
  );
}

