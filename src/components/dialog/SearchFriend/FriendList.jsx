import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../../../redux/slices/app";

const FriendList = () => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <div>
      {friends?.map((user) => (
        <div key={user?._id}>{user?.firstName}</div>
      ))}
    </div>
  );
};

export default FriendList;
