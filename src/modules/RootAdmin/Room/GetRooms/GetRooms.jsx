import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRooms, setRoomNull, deleteRoom, updateRoom } from "../../../../services/Slices/roomSlice";
import { getLocations } from "../../../../services/Slices/locationSlice";
import { Modal, Table, Image, ScrollArea, Button } from '@mantine/core';
import roomAPI from "../../../../services/roomAPI";
import { FaCheck } from "react-icons/fa"
import "../../../../App.scss"
import Loading from '../../../../components/Loading'
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import AddRoom from "../AddRoom/AddRoom";
import EditRoom from "../EditRoom/EditRoom";

const GetRooms = () => {

  const dispatch = useDispatch();

  const { rooms } = useSelector((state) => state.roomSlice);
  const { locations } = useSelector((state) => state.locationSlice);

  const [opened, setOpened] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [searchRoom, setSearchRoom] = useState(null);
  const [idRoom, setIdRoom] = useState(null);
  const [ImgUrl, setImgUrl] = useState('');



  useEffect(() => {
    dispatch(getRooms());
  }, []);

  useEffect(() => {
    dispatch(getLocations());
  }, []);


  const handleSearchRoom = async (evt) => {
    if (!evt.target.value) {
      setSearchRoom(rooms);
      return;
    }

    try {
      const data = await roomAPI.getRoomByLocation(evt.target.value);
      setSearchRoom(data);

    } catch (error) {
      console.log(error);
    }
  };

  const columns = (
    <tr>
      <th>Id</th>
      <th>Tên</th>
      <th>Phòng</th>
      <th>Giá</th>
      <th>Mã Vị Trí</th>
      <th>Hình Ảnh</th>
      <th>Tiện Ích</th>
      <th>Mô Tả</th>
      <th>Tùy Chỉnh</th>
    </tr>
  );

  const rows = (searchRoom ? searchRoom : rooms).map((room) => (
    <tr key={room.id}>
      <td>{room.id}</td>
      <td width={150}>{room.tenPhong}</td>
      <td>
        <li>Bedroom: {room.phongNgu}</li>
        <li>Bed: {room.giuong}</li>
        <li>Bathroom: {room.phongTam}</li>
        <li>Kitchen: {room.bep}</li>
      </td>
      <td>{room.giaTien}$</td>
      <td>{room.maViTri}</td>
      <td >
        <Image width={150} radius="md" src={room.hinhAnh} alt={room.tenPhong} />
      </td>
      <td>
        {room.mayGiat ? <p><FaCheck /> Máy Giặt</p> : ""}
        {room.banLa ? <p><FaCheck /> Bàn Là</p> : ""}
        {room.tivi ? <p><FaCheck /> Ti Vi</p> : ""}
        {room.dieuHoa ? <p><FaCheck /> Điều Hòa</p> : ""}
        {room.wifi ? <p><FaCheck /> Wifi</p> : ""}
        {room.doXe ? <p><FaCheck /> Đỗ Xe</p> : ""}
        {room.hoBoi ? <p><FaCheck /> Hồ Bơi</p> : ""}
      </td>
      <td width={200}>{room.moTa}</td>
      <td>
        <div>
          <button onClick={() => {
            dispatch(updateRoom(room.id))
          }}>
            <FaEdit />
          </button>
          <button onClick={() => {
            if (window.confirm("Bạn có muốn xóa phòng")) {
              dispatch(deleteRoom(room.id))
              alert("Xóa thành công")
            }
          }}>
            <FaRegTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  ));


  // useeffect resetform
  // useEffect(() => {
  //   reset({
  //     tenPhong: '',
  //     khach: '',
  //     phongNgu: '',
  //     giuong: '',
  //     phongTam: '',
  //     moTa: '',
  //     giaTien: '',
  //     mayGiat: 'true',
  //     banLa: 'true',
  //     tivi: 'true',
  //     dieuHoa: 'true',
  //     wifi: 'true',
  //     bep: 'true',
  //     doXe: 'true',
  //     hoBoi: 'true',
  //     banUi: 'true',
  //     maViTri: '',
  //     hinhAnh: ''
  //   }
  //   )
  // }, [opened])

  return (
    <div className='wrap'>
      <div className='wrap__header'>
        <h3>Danh sách phòng</h3>
        <Button onClick={() => setOpened(true)}>Thêm Phòng</Button>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Thêm Phòng"
        >
          <AddRoom/>
        </Modal>
        <Modal
          opened={openedEdit}
          onClose={() => setOpenedEdit(false)}
          title="Cập Nhật Thông Tin Phòng"
        >
          <EditRoom idRoom = {idRoom}/>
        </Modal>

        <div className='wrap__search'>
          <select
            type="text"
            placeholder='Tìm kiếm'
            onChange={handleSearchRoom}
          >
            <option value="">All room</option>
            {locations.map((item) => (
              <option key={item.id} value={item.id} >
                {item.tenViTri}
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

export default GetRooms