import dayjs from "dayjs";

export const  convertTime =  (time)=>{
    const selectedDate =  dayjs(time);
    const resul =   selectedDate.format('YYYY-MM-DD HH:mm:ss');
    return resul
}