import { useSelector } from "react-redux";
import bookingAPI from "../../../../services/bookingAPI";
import { useForm } from '@mantine/form';
import { Button, Select } from '@mantine/core';
import { TextInput, Grid, NumberInput, Textarea, Checkbox } from '@mantine/core';
import { FaUpload } from "react-icons/fa"
import { DatePicker } from '@mantine/dates';

const AddBooking = () => {
  const { bookings } = useSelector((state) => state.bookingSlice);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      maPhong: '',
      ngayDen: '',
      ngayDi: '',
      soLuongKhach: 0,
      maNguoiDung: '',
    },
    validate: (values) => ({
      maPhong: values.maPhong.length < 1 ? 'Mã phòng không để trống' : null,
      ngayDen: values.ngayDen.length < 1 ? 'Ngày đến không để trống' : null,
      ngayDi: values.ngayDi.length < 1  ? 'Ngày đi không để trống' : null,
      soLuongKhach: values.soLuongKhach.length < 1  ? 'Số lượng khách không để trống' : null,
      maNguoiDung: values.maNguoiDung.length < 1 ? 'Mã người dùng không để trống' : null,
    }),
  });

  const onSubmit = async (values) => {
    try {
      await bookingAPI.createBooking(values);
      //reset();

    } catch (error) {
      throw error;
    }
  };
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
    <Grid grow gutter="xs">
      <Grid.Col span={6}>
        <TextInput label="Mã Phòng" placeholder="Nhập mã phòng" {...form.getInputProps('maPhong')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <DatePicker placeholder="Ngày Đến" label="Ngày Đến" withAsterisk {...form.getInputProps('ngayDen')} />;
      </Grid.Col>
      <Grid.Col span={6}>
        <DatePicker placeholder="Ngày Đi" label="Ngày Đi" withAsterisk {...form.getInputProps('ngayDi')} />;
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput label="Số lượng khách" placeholder="Số lượng khách" {...form.getInputProps('soLuongKhach')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Textarea label="Mã Người Dùng" placeholder="Mã Người Dùng" {...form.getInputProps('maNguoiDung')} />
      </Grid.Col>
      
    </Grid>
    <Button type="submit" mt="sm">
      THÊM
    </Button>
    </form>
  )
}

export default AddBooking