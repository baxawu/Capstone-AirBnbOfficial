import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../../../../apis/UserAPI";
import { Navigate, useNavigate, useSearchParams, } from "react-router-dom";
import { useUserContext } from "../../../../contexts/UserContext/UserContext";
import { Avatar, Container, FormControl, TextField, InputAdornment, IconButton, Checkbox, Typography, Button, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import style from "./stylesSignin.module.scss";

const signinSchema = object({
  email: string().required("Tài khoản không được để trống!"),
  password: string()
    .required("Mật khẩu không được để trống!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
});

export default function SignIn() {
  // Show password có icon mắt
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const navigate = useNavigate();
  const [searchParams] =useSearchParams()
  const { currentUser, handleSignin: onSigninSuccess } = useUserContext();
console.log('currentUser',currentUser);

  const {
    mutate: handleSignin,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signin(payload),
    onSuccess: (data) => {
      onSigninSuccess(data);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signinSchema),
    mode: "onTouched",
  });

  const onSubmit = (values) => {
    handleSignin(values);
  };
  //currentUser khac null => user da dang nhap => dieu huong ve home
  if (currentUser) {
    const redirectTo = searchParams.get("redirect");
    return <Navigate to={redirectTo || "/"} replace />;
  }

  return (
    <Box sx={{ border: '1px dashed grey' }}>
      <div className={style.jss1}>
        <Container maxWidth="xs" className={style.jss2}>
          <div className={style.jss3}>
            <Avatar className={style.jss4}>
              <PersonIcon fontSize='large' />
            </Avatar>
            <h3>Đăng Nhập</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ textAlign: 'start' }}>
              <div className={style.jss6}>
                <TextField label="Tài Khoản *" className={errors.email ? style.jss5Erorr : style.jss5} {...register("email")} />
                {errors.email && <p style={{ color: '#fb4226' }}>{errors.email.message}</p>}
              </div>
              <div>
                <TextField className={errors.password ? style.jss5Erorr : style.jss5} type={showPassword ? 'text' : 'password'}  {...register("password")} InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                  label='Mật Khẩu *'
                />
                {errors.password && <p style={{ color: '#fb4226' }}>{errors.password.message}</p>}

              </div>
              <div className={style.jss7} >
                <Checkbox sx={{ padding: 0, margin: '15px 0' }} />
                <Typography>Nhớ tài khoản</Typography>
              </div>
            </FormControl>
            <Button type='submit' disabled={isLoading} className={style.jss8}>Đăng Nhập</Button>
            {error && <p style={{ color: '#fb4226' }}>{error}</p>}
          </form>

          <div style={{ textAlign: 'end', padding: '10px 0' }}>
            <a href="/sign-up">
              <h4>Bạn chưa có tài khoản? Đăng ký</h4>
            </a>
          </div>
        </Container>
      </div>
    </Box> 
  );
}
