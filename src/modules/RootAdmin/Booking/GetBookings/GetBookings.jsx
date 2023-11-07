import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBookings, deleteBooking } from "../../../../services/Slices/bookingSlice";
import bookingAPI from "../../../../services/bookingAPI";
import "../../../../App.scss"
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Modal, Table, Image, ScrollArea, Button } from '@mantine/core';
import AddBooking from '../AddBooking/AddBooking'

const GetBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.bookingSlice);
  console.log(bookings);

  const [searchBooking, setSearchBooking] = useState(null);
  const [opened, setOpened] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);

  useEffect(() => {
    dispatch(getBookings());
  }, []);

  const handleSearchBooking = async (evt) => {
    if (!evt.target.value) {
      setSearchBooking(bookings);
      return;
    }

    try {
      const data = await bookingAPI.getBooking(evt.target.value);
      setSearchBooking(bookings);

    } catch (error) {
      console.log(error);
    }
  };

  const columns = (
    <tr>
      <th>Id</th>
      <th>Mã Phòng</th>
      <th>Ngày Đến</th>
      <th>Ngày Đi</th>
      <th>Số Lượng Khách</th>
      <th>Mã Người Dùng</th>
      <th>Tùy Chỉnh</th>
    </tr>
  );

  const rows = (searchBooking ? searchBooking : bookings).map((booking) => (
    <tr key={booking.id}>
      <td>{booking.id}</td>
      <td>{booking.maPhong}</td>
      <td>{booking.ngayDen}</td>
      <td>{booking.ngayDi}</td>
      <td>{booking.soLuongKhach}</td>
      <td>{booking.maNguoiDung}</td>
      <td>
        <div>
          <button onClick={() => {
            //dispatch(updateBooking(booking.id))
          }}>
            <FaEdit />
          </button>
          <button onClick={() => {
            if (window.confirm("Bạn có muốn đặt chỗ")) {
              dispatch(deleteBooking(booking.id))
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
      <h3>Danh sách đặt chỗ</h3>
      <Button onClick={() => setOpened(true)}>Đặt Chỗ</Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Đặt Chỗ"
      >
        <AddBooking/>
      </Modal>
      <Modal
        opened={openedEdit}
        onClose={() => setOpenedEdit(false)}
        title="Cập Nhật Đặt Chỗ"
      >
        {/* <EditComment idBooking = {idBooking}/> */}
      </Modal>

      <div className='wrap__search'>
        <select
          type="text"
          placeholder='Tìm kiếm'
          onChange={handleSearchBooking}
        >
          <option value="">All User</option>
          {bookings.map((item) => (
            <option key={item.id} value={item.id} >
              {item.maNguoiDung}
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

export default GetBookings