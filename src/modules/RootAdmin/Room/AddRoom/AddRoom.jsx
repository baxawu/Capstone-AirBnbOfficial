import { useSelector } from "react-redux";
import roomAPI from "../../../../services/roomAPI";
import { useForm } from '@mantine/form';
import { Button, Select } from '@mantine/core';
import { TextInput, Grid, NumberInput, Textarea, Checkbox } from '@mantine/core';
import { FaUpload } from "react-icons/fa"


const AddRoom = () => {

  const { locations } = useSelector((state) => state.locationSlice);

  const data = locations.map((item) => (
    { value: item.id, label: item.tenViTri }
  ))

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      tenPhong: '',
      maViTri: '',
      khach: 0,
      giaTien: 0,
      phongNgu: 0,
      giuong: 0,
      phongTam: 0,
      bep: 0,
      moTa: "",
      hinhAnh: '',

      mayGiat: false,
      banLa: false,
      tivi: false,
      dieuHoa: false,
      wifi: false,
      doXe: false,
      hoBoi: false,
      banUi: false,
    },
    validate: (values) => ({
      tenPhong: values.tenPhong.length < 1 ? 'Tên phòng không để trống' : null,
      maViTri: values.maViTri.length < 1 ? 'Mã vị trí không để trống' : null,
      khach: values.khach < 1 || values.khach > 10 ? 'Sức chứa 1 - 10 khách' : null,
      giaTien: values.giaTien < 1 ? 'Giá tiền không hợp lệ' : null,
      phongNgu: values.phongNgu < 1 || values.phongNgu > 5 ? 'Phòng ngủ từ 1 đến 5' : null,
      giuong: values.giuong < 1 || values.giuong > 5 ? 'Giường từ 1 đến 5' : null,
      phongTam: values.phongTam < 1 || values.phongTam > 5 ? 'Phòng tắm từ 1 đến 5' : null,
      bep: values.bep < 1 || values.bep > 5 ? 'Bếp từ 1 đến 5' : null,
      moTa: values.moTa.length < 1 ? 'Mô tả không để trống' : null,
      hinhAnh: values.hinhAnh.length < 1 ? 'Hình ảnh không để trống' : null,

      mayGiat: values.length < 1 ? 'Tên phòng không để trống' : null,
      banLa: values.length < 1 ? "Bàn là không để trống" : null,
      tivi: values.length < 1 ? 'Tên phòng không để trống' : null,
      dieuHoa: values.length < 1 ? 'Điều hòa không để trống' : null,
      wifi: values.length < 1 ? 'Tên phòng không để trống' : null,
      doXe: values.length < 1 ? 'Tên phòng không để trống' : null,
      hoBoi: values.length < 1 ? 'Tên phòng không để trống' : null,
      banUi: values.length < 1 ? 'Tên phòng không để trống' : null,
    }),
  });

  const onSubmit = async (values) => {
    try {
      await roomAPI.createRoom(values);
      //reset();

    } catch (error) {
      throw error;
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
    <Grid grow gutter="xs">
      <Grid.Col span={6}>
        <TextInput label="Tên Phòng" placeholder="Nhập tên phòng" {...form.getInputProps('tenPhong')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Select
          label="Chọn địa điểm"
          data={data}
          placeholder="Chọn địa điểm"
          searchable
          creatable
          {...form.getInputProps('maViTri')}

        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput label="Số lượng khách" placeholder="Nhập số khách" {...form.getInputProps('khach')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput label="Giá tiền" placeholder="Nhập số tiền" {...form.getInputProps('giaTien')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput label="Phòng ngủ" placeholder="Nhập số phòng ngủ" {...form.getInputProps('phongNgu')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput label="Giường ngủ" placeholder="Số giường" {...form.getInputProps('giuong')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput label="Phòng Tắm" placeholder="Nhập số phòng tắm" {...form.getInputProps('phongTam')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput label="Phòng Bếp" placeholder="Nhập số phòng bếp" {...form.getInputProps('bep')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Textarea label="Mô tả" placeholder="Mô Tả" {...form.getInputProps('moTa')} />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput label="Hình Ảnh" placeholder="Hình Ảnh" {...form.getInputProps('hinhAnh')}
          icon={<FaUpload size={14} />} />
      </Grid.Col>
      <Grid.Col span={12}>
      <p>Các tiện ích của phòng</p>
      </Grid.Col>
      <Grid.Col span={3}>
      <Checkbox
        mt="md"
        value="mayGiat"
        label="Máy Giặt"
        {...form.getInputProps('mayGiat', { type: 'checkbox' })}
      />
      </Grid.Col>
      <Grid.Col span={3}>
      <Checkbox
        mt="md"
        value="banLa"
        label="Bàn Là"
        {...form.getInputProps('banLa', { type: 'checkbox' })}
      />
      </Grid.Col>
      <Grid.Col span={3}>
      <Checkbox
        mt="md"
        value="tivi"
        label="Ti vi"
        {...form.getInputProps('tivi', { type: 'checkbox' })}
      />
      </Grid.Col>
      <Grid.Col span={3}>
      <Checkbox
        mt="md"
        value="dieuHoa"
        label="Điều Hòa"
        {...form.getInputProps('dieuHoa', { type: 'checkbox' })}
      />
      </Grid.Col>
      <Grid.Col span={3}>
      <Checkbox
        mt="md"
        value="wifi"
        label="Wifi"
        {...form.getInputProps('wifi', { type: 'checkbox' })}
      />
      </Grid.Col>
      <Grid.Col span={3}>
      <Checkbox
        mt="md"
        value="doXe"
        label="Đỗ Xe"
        {...form.getInputProps('doXe', { type: 'checkbox' })}
      />
      </Grid.Col>
      <Grid.Col span={3}>
      <Checkbox
        mt="md"
        value="hoBoi"
        label="Hồ Bơi"
        {...form.getInputProps('hoBoi', { type: 'checkbox' })}
      />
      </Grid.Col>
      <Grid.Col span={3}>
      <Checkbox
        mt="md"
        value="banUi"
        label="Bàn Ủi"
        {...form.getInputProps('banUi', { type: 'checkbox' })}
      />
      </Grid.Col>
    </Grid>
    <Button type="submit" mt="sm">
      THÊM
    </Button>
    </form>
   
  )
}

export default AddRoom