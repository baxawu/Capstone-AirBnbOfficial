import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../../../../services/Slices/userSlice";
import usersAPI from "../../../../services/userAPI";
import "../../../../App.scss"
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Modal, Table, Image, ScrollArea, Button } from '@mantine/core';
import AddUser from '../AddUser/AddUser'

const GetUsers = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.userSlice);
    const [searchUser, setSearchUser] = useState(null);

    const [opened, setOpened] = useState(false);
    const [openedEdit, setOpenedEdit] = useState(false);

    useEffect(() => {
        dispatch(getUsers());
      }, []);

      
  const handleSearchUser = async (evt) => {
    if (!evt.target.value) {
      setSearchUser(users);
      return;
    }

    try {
      const data = await usersAPI.getUsers(evt.target.value);
      setSearchUser(users);

    } catch (error) {
      console.log(error);
    }
  };

  const columns = (
    <tr>
      <th>Id</th>
      <th>Tên</th>
      <th>Email</th>
      <th>Ngày Sinh</th>
      <td>Giới Tính</td>
      <td>Phân Quyền</td>
      <th>Tùy Chỉnh</th>
    </tr>
  );

  const rows = (searchUser ? searchUser : users).map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.birthday}</td>
      <td>{user.gender}</td>
      <td>{user.role}</td>
      <td>
        <div>
          <button onClick={() => {
            //dispatch(updateUser(user.id))
          }}>
            <FaEdit />
          </button>
          <button onClick={() => {
            if (window.confirm("Bạn có muốn xóa người dùng")) {
              dispatch(deleteUser(user.id))
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
      <h3>Danh sách người dùng</h3>
      <Button onClick={() => setOpened(true)}>Thêm Người Dùng</Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Thêm Người Dùng"
      >
        <AddUser/>
      </Modal>
      <Modal
        opened={openedEdit}
        onClose={() => setOpenedEdit(false)}
        title="Cập Nhật Bình Luận"
      >
        {/* <EditUser idUser = {idUser}/> */}
      </Modal>

      <div className='wrap__search'>
        <select
          type="text"
          placeholder='Tìm kiếm'
          onChange={handleSearchUser}
        >
          <option value="">Phân Quyền</option>
          {users.map((item) => (
            <option key={item.id} value={item.id} >
              {item.role}
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

export default GetUsers