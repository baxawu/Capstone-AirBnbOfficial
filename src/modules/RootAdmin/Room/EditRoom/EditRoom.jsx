// import React, { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getRoomById, getRooms } from "../../../../services/Slices/roomSlice";

// import roomAPI from "../../../../services/roomAPI";
// import { handleModalEditRoom } from "../../../../../slices/modalSlice";
// const EditRoom = ({idRoom}) => {
//     const dispatch = useDispatch();
//     const { rooms } = useSelector((state) => state.roomSlice);
//     const { locations } = useSelector(state => state.locationSlice)

//     useEffect(() => {
//         dispatch(getRoomById(idRoom));
//       }, [idRoom, modalEditRoom]);
    
//   return (
//     <div>EditRoom</div>
//   )
// }

// export default EditRoom