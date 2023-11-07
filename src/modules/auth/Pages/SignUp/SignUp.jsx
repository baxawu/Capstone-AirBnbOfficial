import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  boolean, object, string } from "yup";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../../../apis/UserAPI";
import { useNavigate } from "react-router-dom";
import style from "../SignIn/stylesSignin.module.scss";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuItem from "@mui/material/MenuItem";

const signupSchema = object({
  name: string().required("Tài khoản không được để trống"),
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  password: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 ký tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
  phone: string().required("Số điện thoại không được để trống !"),
  birthday: string().required("Vui lòng nhập ngày sinh không được để trống !"),
  gender: boolean().required("Vui lòng chọn giới tính !"),
  role: string().required("Vui lòng chọn vai trò !"),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: boolean,
      role: "",
    },
    resolver: yupResolver(signupSchema),
    mode: "onTouched",
  });

  const genderChoose = [
    {
      value: true,
      label: "Male",
    },
    {
      value: false,
      label: "Female",
    },
  ];


  const {
    mutate: handleSignup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signup(payload),
    onSuccess: () => {
      navigate("/sign-in");
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values) => {
    handleSignup(values);
  };

  return (
    <Box>
      <div className={style.jss1}>
        <Container maxWidth="xs" className={style.jss2}>
          <div className={style.jss3}>
            <Avatar className={style.jss4}>
              <LockOpenIcon fontSize="medium" />
            </Avatar>
            <h3>Đăng Ký</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ textAlign: "start" }}>
              <div className={style.jss6}>
                <TextField
                  label="Tài Khoản *"
                  className={errors.taiKhoan ? style.jss5Erorr : style.jss5}
                  {...register("name")}
                />
                {errors.name && (
                  <p style={{ color: "#fb4226" }}>{errors.name.message}</p>
                )}
              </div>
              <div className={style.jss6}>
                <TextField
                  label="Email *"
                  className={errors.email ? style.jss5Erorr : style.jss5}
                  {...register("email")}
                />
                {errors.email && (
                  <p style={{ color: "#fb4226" }}>{errors.email.message}</p>
                )}
              </div>
              <div>
                <TextField
                  className={errors.password ? style.jss5Erorr : style.jss5}
                  type={showPassword ? "password" : "text"}
                  label="Mật Khẩu *"
                  {...register("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && (
                  <p style={{ color: "#fb4226" }}>{errors.password.message}</p>
                )}
              </div>
              <div>
                <TextField
                  {...register("phone")}
                  className={errors.phone ? style.jss5Erorr : style.jss5}
                  label="Nhập số điện thoại *"
                  sx={{ marginTop: "16px" }}
                />
                {errors.phone && (
                  <p style={{ color: "#fb4226" }}>{errors.phone.message}</p>
                )}
              </div>
              <div className={style.jss6}>
                <TextField
                  label="Ngày sinh *"
                  className={errors.birthday ? style.jss5Erorr : style.jss5}
                  {...register("birthday")}
                />
                {errors.birthday && (
                  <p style={{ color: "#fb4226" }}>{errors.birthday.message}</p>
                )}
              </div>
              <div className={style.jss6}>
                <TextField
                  label="Chọn giới tính *"
                  defaultValue={true}
                  select
                  className={errors.gender ? style.jss5Erorr : style.jss5}
                  {...register("gender")}
                >
                  {""}
                  {genderChoose.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.gender && (
                  <p style={{ color: "#fb4226" }}>{errors.gender.message}</p>
                )}
              </div>
              <div className={style.jss6}>
                <TextField
                  label="Vai trò *"
                  className={errors.role ? style.jss5Erorr : style.jss5}
                  {...register("role")}
                />

                {errors.role && (
                  <p style={{ color: "#fb4226" }}>{errors.role.message}</p>
                )}
              </div>
              <Button type="submit" disabled={isLoading} className={style.jss8}>
                Đăng Ký
              </Button>
              {error && <p>{error}</p>}
            </FormControl>
          </form>
          <div style={{ textAlign: "end", paddingBottom: "10px" }}>
            <a href="/sign-in">
              <h4>Bạn đã có tài khoản? Đăng nhập</h4>
            </a>
          </div>
        </Container>
      </div>
    </Box>
  );
}

