import { searchNearBy } from "../../../apis/searchNearBy";
import { useQuery } from "@tanstack/react-query";
import SearchRecent from "../../../components/SearchRecent/SearchRecent";
import Grid from "@mui/material/Grid";
import style from "./nearby.module.scss";

export default function NearBy() {
  //api lấy danh sách vị trí
  const { data: searchs = [] } = useQuery({
    queryKey: ["search"],
    queryFn: searchNearBy,
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h3 className={style.name}>Discover near places</h3>
      <Grid container spacing={4}>
        {searchs?.data?.map((item) => {
          console.log(item);
          const tenP = item.tenPhong.slice(0, 10);
          return (
            <Grid item xs={4} key={item.id}>
              <SearchRecent
                key={item.id}
                linklImg={item.hinhAnh}
                title={tenP}
                id={item.id}
              />
            </Grid>
          );
        })}
      </Grid>

      <div>
        <h3 className={style.name}>Stay anywhere</h3>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <div className={style.wrapImg}>
              <a href="/details/2">
                <img
                  src="https://airbnb-five-sandy.vercel.app/static/media/entire-place.232c8ac832fcad480fee.webp"
                  alt="stay"
                />
              </a>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={style.wrapImg}>
              <a href="/details/3">
                <img
                  src="https://airbnb-five-sandy.vercel.app/static/media/entire-place.232c8ac832fcad480fee.webp"
                  alt="stay"
                />
              </a>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={style.wrapImg}>
              <a href="/details/889">
                <img
                  src="https://airbnb-five-sandy.vercel.app/static/media/entire-place.232c8ac832fcad480fee.webp"
                  alt="stay"
                />
              </a>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
