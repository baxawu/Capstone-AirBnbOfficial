import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getLocations, getLocationById, deleteLocation } from "../../../../services/Slices/locationSlice";
import { Modal, Table, Image, ScrollArea, Button } from '@mantine/core';
import locationsAPI from "../../../../services/locationsAPI";
import "../../../../App.scss"
import Loading from '../../../../components/Loading'
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import AddLocation from '../AddLocation/AddLocation';
import EditLocation from '../EditLocation/EditLocation'

const GetLocations = () => {
  const dispatch = useDispatch();
  const { locations, loading } = useSelector((state) => state.locationSlice);
  
  const [opened, setOpened] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [searchLocation, setSearchLocation] = useState(null);
  const [idLocation, setIdLocation] = useState(null);
  const [ImgUrl, setImgUrl] = useState('');


  useEffect(() => {
    dispatch(getLocations());
  }, []);
  console.log(locations);

    const handleSearchLocation = async (evt) => {
    if (!evt.target.value) {
      setSearchLocation(locations);
      console.log(setSearchLocation(locations));
      return;
    }

    try {
      //const data = await locationsAPI.getLocationById(evt.target.value);
      setSearchLocation(locations);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = (
    <tr>
      <th>Id</th>
      <th>Địa Danh</th>
      <th>Địa Điểm</th>
      <th>Quốc Gia</th>
      <th>Hình Ảnh</th>
      <th>Tùy Chỉnh</th>
    </tr>
  );

  const rows = (searchLocation ? searchLocation : locations).map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td width={150}>{item.tenViTri}</td>
      <td>{item.tinhThanh}</td>
      <td>{item.quocGia}</td>
      <td >
        <Image width={150} radius="md" src={item.hinhAnh} alt={item.tenViTri} />
      </td>
      <td>
        <div>
          <button onClick={() => {
            //dispatch(updateLocation(item.id))
          }}>
            <FaEdit />
          </button>
          <button onClick={() => {
            if (window.confirm("Bạn có muốn xóa địa danh này")) {
              dispatch(deleteLocation(item.id))
              alert("Xóa thành công")
            }
          }}>
            <FaRegTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  ));
  return (
    <div className='wrap'>
      <div className='wrap__header'>
        <h3>Danh sách Địa Danh</h3>
        <Button onClick={() => setOpened(true)}>Thêm Địa Danh</Button>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Thêm Địa Danh"
        >
          <AddLocation/>
        </Modal>
        <Modal
          opened={openedEdit}
          onClose={() => setOpenedEdit(false)}
          title="Cập Nhật Thông Tin"
        >
          <EditLocation idLocation = {idLocation}/>
        </Modal>

        <div className='wrap__search'>
          <select
            type="text"
            placeholder='Tìm kiếm'
            onChange={handleSearchLocation}
          >
            <option value="">All địa danh</option>
            {locations.map((item) => (
              <option key={item.id} value={item.id} >
                {item.tinhThanh}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='wrap__content'>
        <ScrollArea style={{ height: 500 }}>
          <Table striped highlightOnHover >
            <thead>{columns}</thead>
            <tbody >{rows}</tbody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}

export default GetLocations