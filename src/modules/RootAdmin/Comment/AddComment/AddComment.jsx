import { useSelector } from "react-redux";
import commentAPI from "../../../../services/commentAPI";
import { useForm } from '@mantine/form';
import { Button, Select } from '@mantine/core';
import { TextInput, Grid, NumberInput, Textarea, Checkbox } from '@mantine/core';
import { FaUpload } from "react-icons/fa"
import { DatePicker } from '@mantine/dates';


const AddComment = () => {

  const { locations } = useSelector((state) => state.locationSlice);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      maPhong: '',
      maNguoiBinhLuan: '',
      ngayBinhLuan: '',
      noiDung: '',
      saoBinhLuan: 0,
    },
    validate: (values) => ({
      maPhong: values.maPhong.length < 1 ? 'Mã phòng không để trống' : null,
      maNguoiBinhLuan: values.maNguoiBinhLuan.length < 1 ? 'Mã người bình luận không để trống' : null,
      ngayBinhLuan: values.ngayBinhLuan.length < 1  ? 'Ngày bình luận không để trống' : null,
      noiDung: values.noiDung.length < 1  ? 'Nội dung không để trống' : null,
      saoBinhLuan: values.saoBinhLuan < 1 || values.saoBinhLuan > 5 ? 'Đánh giá sao từ 1 đến 5' : null,
    }),
  });

  const onSubmit = async (values) => {
    try {
      await commentAPI.createComment(values);
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
        <TextInput label="Mã Người Bình Luận" placeholder="Nhập mã người bình luận" {...form.getInputProps('maNguoiBinhLuan')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <DatePicker placeholder="Ngày Bình Luận" label="Ngày Bình Luận" withAsterisk {...form.getInputProps('ngayBinhLuan')} />;
        {/* <TextInput label="Ngày Bình Luận" placeholder="Nhập ngày bình luận" {...form.getInputProps('ngayBinhLuan')} /> */}
      </Grid.Col>
      <Grid.Col span={6}>
        <Textarea label="Nội Dung" placeholder="Nội dung" {...form.getInputProps('noiDung')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput label="Đánh Giá" placeholder="Đánh giá" {...form.getInputProps('saoBinhLuan')} />
      </Grid.Col>
    </Grid>
    <Button type="submit" mt="sm">
      THÊM
    </Button>
    </form>
  )
}

export default AddComment