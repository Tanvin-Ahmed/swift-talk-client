import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriendRequests } from "../../../redux/slices/app";

const FriendRequestList = () => {
  const dispatch = useDispatch();
  const { friendRequests } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(fetchFriendRequests());
  }, [dispatch]);

  return (
    <div>
      {friendRequests?.map((user) => (
        <div key={user?._id}>{user?.firstName}</div>
      ))}
    </div>
  );
};

export default FriendRequestList;
