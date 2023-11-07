import { searchNearBy } from '../../../apis/searchNearBy'
import { useQuery } from '@tanstack/react-query';
import SearchRecent from '../../../components/SearchRecent/SearchRecent';
import Grid from '@mui/material/Grid';
import style from './nearby.module.scss'

export default function NearBy() {

  //api lấy danh sách vị trí
  const { data: searchs = [] } = useQuery({
    queryKey: ["search"],
    queryFn: searchNearBy,
  });

  return (
    <div>
      <h3 className={style.name} style={{padding:'30px'}}>Discover near places</h3>
      <Grid container maxWidth={1200} margin={'0 auto'}>
        {searchs?.data?.map((item) => {
          return (
            <Grid spacing={4} xs={3} className={style.GrapContent} >
              <SearchRecent key={item.id} linklImg={item.hinhAnh} title={"hai chau"} id={item.id} />
            </Grid>
          )
        })}
        <div>
          <h3 className={style.name}>Stay anywhere</h3>
          <Grid container spacing={8}>
            <Grid item xs={4}>
              <div className={style.wrapImg}>
                <img src="https://airbnb-five-sandy.vercel.app/static/media/entire-place.232c8ac832fcad480fee.webp" alt="stay" />

              </div>
              <p className={style.title}>Entire place</p>
            </Grid>
            <Grid item xs={4}>
              <div className={style.wrapImg}>
                <img src="https://airbnb-five-sandy.vercel.app/static/media/entire-place.232c8ac832fcad480fee.webp" alt="stay" />

              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={style.wrapImg}>
                <img src="https://airbnb-five-sandy.vercel.app/static/media/entire-place.232c8ac832fcad480fee.webp" alt="stay" />

              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>



    </div>

  );

}
