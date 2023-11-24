import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/slices/app";

const UserList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      {users?.map((user) => (
        <div key={user?._id}>{user?.firstName}</div>
      ))}
    </div>
  );
};

export default UserList;
