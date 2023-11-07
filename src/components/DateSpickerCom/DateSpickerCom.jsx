import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { convertTime } from '../../utils/utils';
export default function DatePickerValue(props) {
  const [value, setValue] = React.useState(dayjs('2022-04-17'));

const handleDateChange = (newValue,newValue1) => {
  // Lấy thời gian từ giá trị mới của DatePicker

  // Xử lý giá trị theo cách bạn muốn ở đây
  setValue(()=>convertTime(newValue));

  props.setTime(value)

};
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DatePicker']}>
        <DatePicker
        label="Chọn ngày"
          value={value}
          onChange={(newValue) => handleDateChange(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}