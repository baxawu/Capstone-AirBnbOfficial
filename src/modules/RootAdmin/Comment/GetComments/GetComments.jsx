import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComments, deleteComment } from "../../../../services/Slices/commentSlice";
import commentsAPI from "../../../../services/commentAPI";
import "../../../../App.scss"
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Modal, Table, Image, ScrollArea, Button } from '@mantine/core';
import AddComment from '../AddComment/AddComment'

const GetComments = () => {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.commentSlice);
  console.log(comments);
  const [searchComment, setSearchComment] = useState(null);
  const [opened, setOpened] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);

  useEffect(() => {
    dispatch(getComments());
  }, []);

  const handleSearchComment = async (evt) => {
    if (!evt.target.value) {
      setSearchComment(comments);
      return;
    }

    try {
      const data = await commentsAPI.getComments(evt.target.value);
      setSearchComment(comments);

    } catch (error) {
      console.log(error);
    }
  };

  const columns = (
    <tr>
      <th>Id</th>
      <th>Mã Phòng</th>
      <th>Mã Người Bình Luận</th>
      <th>Ngày Bình Luận</th>
      <th>Nội Dung</th>
      <th>Sao Bình Luận</th>
      <th>Tùy Chỉnh</th>
    </tr>
  );

  const rows = (searchComment ? searchComment : comments).map((comment) => (
    <tr key={comment.id}>
      <td>{comment.id}</td>
      <td>{comment.maPhong}</td>
      <td>{comment.maNguoiBinhLuan}</td>
      <td>{comment.ngayBinhLuan}</td>
      <td>{comment.noiDung}</td>
      <td>{comment.saoBinhLuan}</td>
      <td>
        <div>
          <button onClick={() => {
            //dispatch(updateRoom(comment.id))
          }}>
            <FaEdit />
          </button>
          <button onClick={() => {
            if (window.confirm("Bạn có muốn xóa comment")) {
              dispatch(deleteComment(comment.id))
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
      <h3>Danh sách comment</h3>
      <Button onClick={() => setOpened(true)}>Thêm Bình Luận</Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Thêm Bình Luận"
      >
        <AddComment/>
      </Modal>
      <Modal
        opened={openedEdit}
        onClose={() => setOpenedEdit(false)}
        title="Cập Nhật Bình Luận"
      >
        {/* <EditComment idComment = {idComment}/> */}
      </Modal>

      <div className='wrap__search'>
        <select
          type="text"
          placeholder='Tìm kiếm'
          onChange={handleSearchComment}
        >
          <option value="">All comment</option>
          {comments.map((item) => (
            <option key={item.id} value={item.id} >
              {item.maPhong}
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

export default GetComments