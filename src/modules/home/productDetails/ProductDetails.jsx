
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDetails } from '../../../apis/productAPI';
import { useQuery } from '@tanstack/react-query';
import style from './productDetails.module.scss'
import { Grid } from '@mui/material';
export default function ProductDetails() {
  const {detailsid} = useParams();
const navigate = useNavigate();

  //api lấy danh sách vị trí
  const { data: products = [] } = useQuery({
    queryKey: ["product",detailsid],
    queryFn: () => getDetails(detailsid),
  });
const handleNavi=(detailsid)=>{
  navigate(`/room-details/${detailsid}`)
}
  return (
    <Grid container spacing={6} maxWidth={1200} margin={'0 auto'}>
      <Grid xs={4} >
      <h3 className={style.text}>{products.giuong} Giường ngủ</h3>
      <div className={style.wrapHinh}>
        <img src={products.hinhAnh} alt="pro" />
      </div>
      <a className={style.roomContent} onClick={()=>handleNavi(detailsid)}>
          <h5>{products.tenPhong}</h5>
        <div className={style.moTa}>
          <p>{products.phongTam} Phòng tắm</p>
          <p>{products.phongNgu} Phòng Ngủ</p>
          <p>{products.khach} Số khách</p>
        </div>
      </a>
      </Grid>
    </Grid>
  )
}
