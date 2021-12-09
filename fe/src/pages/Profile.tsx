import { useEffect, useState } from "react";
import { UserService } from "../api/services/UserService";
import EditProfileModal from "../components/Modals/EditProfileModal";
import User from "../interfaces/user.interface";
// import useAuth from "../utils/useAuth";

export const Profile = () => {
//   const { user } = useAuth();
  const [user, setUser] = useState<User>();
  const [openEditProfileModal, setopenEditProfileModal] = useState(false);

  useEffect(() => {
    UserService.getUser().then((data) => {
      setUser(data);
    });
  }, [openEditProfileModal]);
  return (
    <>
      <EditProfileModal
        open={openEditProfileModal}
        changeOpen={setopenEditProfileModal}
        user={user}
      />
      {/* <p>{user?.first_name}</p>
      <p>{user?.last_name}</p>
      <p>{user?.email}</p> */}
      <p>{user?.first_name}</p>
      <p>{user?.last_name}</p>
      <p>{user?.email}</p>
      <button onClick={() => setopenEditProfileModal(true)}>Edit</button>
    </>
  );
};
