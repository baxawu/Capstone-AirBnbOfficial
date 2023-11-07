import { useSelector } from "react-redux";
import locationsAPI from "../../../../services/locationsAPI";
import { useForm } from '@mantine/form';
import { Button, Select } from '@mantine/core';
import { TextInput, Grid, NumberInput, Textarea, Checkbox } from '@mantine/core';
import { FaUpload } from "react-icons/fa"

const AddLocation = () => {
  const { locations } = useSelector((state) => state.locationSlice);

   const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      tenViTri: '',
      tinhThanh: '',
      quocGia: '',
      hinhAnh: '',
    },
    validate: (values) => ({
      tenViTri: values.tenViTri.length < 1 ? 'Tên vị trí không để trống' : null,
      tinhThanh: values.tinhThanh.length < 1 ? 'Tên tỉnh thành không để trống' : null,
      quocGia: values.quocGia.length < 1  ? 'Tên quốc gia không để trống' : null,
      hinhAnh: values.hinhAnh.length < 1 ? 'Hình ảnh không để trống' : null,
    }),
  });

  const onSubmit = async (values) => {
    try {
      await locationsAPI.createLocation(values);
      //reset();

    } catch (error) {
      throw error;
    }
  };
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
    <Grid grow gutter="xs">
      <Grid.Col span={6}>
        <TextInput label="Tên Vị Trí" placeholder="Nhập tên vị trí" {...form.getInputProps('tenViTri')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Textarea label="Tên Tỉnh Thành" placeholder="Nhập tên tỉnh thành" {...form.getInputProps('tinhThanh')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Textarea label="Tên Quốc Gia" placeholder="Nhập tên quốc gia" {...form.getInputProps('quocGia')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput label="Hình Ảnh" placeholder="Hình Ảnh" {...form.getInputProps('hinhAnh')}
          icon={<FaUpload size={14} />} />
      </Grid.Col>
    </Grid>
    <Button type="submit" mt="sm">
      THÊM
    </Button>
    </form>
  )
}

export default AddLocation