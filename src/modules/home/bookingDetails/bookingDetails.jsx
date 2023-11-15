import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query"; // Fix the import statement
import { useNavigate, useParams } from "react-router-dom";

import { datPhong, getDetails, getphong } from "../../../apis/productAPI";
import { Box } from "@mui/material";
import style from "./bookingDetails.module.scss";
import RulaCompo from "../../../components/RuleCompo/RulaCompo";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ChatIcon from "@mui/icons-material/Chat";
import DatePickerComp from "../../../components/DateSpickerCom/DateSpickerCom";
import ModalComponent from "../../../components/ModalComponent/modal";
import FormControl from "../../../components/FormControl/FormControl";
import { calculateTotalGuest } from "../../../components/FormControl/constan";
import { useUserContext } from "../../../contexts/UserContext/UserContext";
import Swal from "sweetalert2";
import { getComment } from "../../../apis/commentAPI";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function BookingDetails() {
  const history = useNavigate()
  // Rename the component to start with an uppercase letter
  const { currentUser, handleSignout } = useUserContext();
  const idnguoidung = currentUser?.user?.id;
  const { detailsid } = useParams();
  const [timein, setTimeIn] = useState("");
  const [timeout, setTimeOut] = useState("");
  const [songuoi, setSoNguoi] = useState(0);
  const { data: products = [] } = useQuery({
    queryKey: ["product", detailsid],
    queryFn: () => getDetails(detailsid),
  });

  const { data: getComent = [] } = useQuery({
    queryKey: ["comment", detailsid],
    queryFn: () => getComment(detailsid),
  });

  const mutationDatphong = useMutation({
    mutationFn: (newTodo) => {
      return datPhong(newTodo);
    },
  });
  const checkBTN = () => {
    if (!currentUser) {
      Swal.fire("Vui lòng đăng nhập trước khi đặt phòng!");
      return;
    } else if (!timein) {
      Swal.fire("Bạn chưa chọn ngày đến ", "Vui lòng chọn ngày đến!");
      return;
    } else if (!timeout) {
      Swal.fire("Bạn chưa chọn ngày đi", "Vui lòng chọn ngày đi!");
      return;
    } else if (!songuoi) {
      Swal.fire("Bạn chưa chọn số lượng", "Vui lòng chọn số lượng!");
      return;
    }
  };
  useEffect(()=>{
    console.log(currentUser);
    if (!currentUser){
      Swal.fire("Vui lòng đăng nhập trước khi đặt phòng!");
  history('/sign-in');
    }
  },[currentUser])

  useEffect(() => {
    if (mutationDatphong?.isSuccess) {
      Swal.fire("Đặt phòng thành công!");
    }
    if (mutationDatphong?.isError) {
      Swal.fire("Lỗi!");
    }
  }, [mutationDatphong?.isSuccess, mutationDatphong?.isError]);

  return (
    <Grid container spacing={6} maxWidth={1200} margin={"0 auto"}>
      <div>
        <h3 className={style.PageTitle}>{products.tenPhong}</h3>
        <div className={style.wrapImg}>
          <img src={products.hinhAnh} alt="" />
        </div>
        <Grid container spacing={4}>
          <Grid item xs={7}>
            <ul className={style.jss1}>
              <li className={style.jss2}>{products.khach} Khách</li>
              <li className={style.jss2}>{products.phongNgu} Phòng</li>
              <li className={style.jss2}>{products.giuong} Giường</li>
            </ul>
            <hr className={style.hr} />
            <div className={style.jss3}>
              <div>
                <RulaCompo
                  text={"You can check in with the doorman."}
                  name={"Self check-in"}
                  icon={<MeetingRoomIcon />}
                />
                <RulaCompo
                  text={
                    "100% of recent guests gave the location a 5-star rating."
                  }
                  name={"Great location"}
                  icon={<AddLocationAltIcon />}
                />
                <RulaCompo
                  text={
                    "93% of recent guests rated Amsterdam The Crane By YAYS 5-star in communication."
                  }
                  name={"Great communication"}
                  icon={<ChatIcon />}
                />
              </div>
              <div className={style.jss3}>{products.moTa}</div>
              <hr className={style.hr} />
            </div>
          </Grid>
          <Grid item xs={5}>
            <div>
              <Box>
                <div>
                  <h2>VND</h2>
                  <p>/day</p>
                  <div style={{ display: "flex", gap: 4 }}>
                    <DatePickerComp
                      onClick={checkBTN}
                      setTime={setTimeIn}
                      label={"check in"}
                    />
                    <DatePickerComp
                      onClick={checkBTN}
                      setTime={setTimeOut}
                      label={"check out"}
                    />
                  </div>
                  <div>
                    <ModalComponent songuoi={songuoi}>
                      <FormControl
                        onHandleTotalGuest={calculateTotalGuest}
                        shareGuest={setSoNguoi}
                      />
                    </ModalComponent>
                  </div>
                  <button
                    onClick={() =>
                      mutationDatphong.mutate({
                        detailsid,
                        timein,
                        timeout,
                        songuoi,
                        idnguoidung,
                      })
                    }
                    className={style.wrapperBtn}
                  >
                    Đặt phòng
                  </button>
                  <div className={style.gia}>
                    <span>VND 19 x 1 days</span>
                    <div className={style.gia}></div>19 VND
                  </div>
                  <div className={style.gia}>
                    <span>Service fee </span>
                    <div></div>
                    {products.giaTien} VND
                  </div>
                </div>
                <div className={style.gia}>
                  <span>Thành Tiền</span> <span>1000 VND</span>
                </div>
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        bình luận
        {getComent?.map((item, index) => {
          return (
            <div key={item.id}>
              <AccountCircleIcon /> {item.ngayBinhLuan}
              <div>{item?.noiDung}</div>
            </div>
          );
        })}
      </div>
    </Grid>
  );
}
