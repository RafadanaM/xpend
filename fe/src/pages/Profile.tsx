import { useEffect, useState } from "react";
import { UserService } from "../api/services/UserService";
import EditProfileModal from "../components/Modals/EditProfileModal";
import { formatDate, transactionDateFormat } from "../utils/formatDate";

interface UserWithDate {
  email: string;
  first_name: string;
  last_name: string;
  created: string;
}

export const Profile = () => {
  const [user, setUser] = useState<UserWithDate>();
  const [openEditProfileModal, setopenEditProfileModal] = useState(false);

  useEffect(() => {
    UserService.getUser().then((data) => {
      setUser(data);
      console.log(data);
    });
  }, [openEditProfileModal]);
  return (
    <>
      <EditProfileModal
        open={openEditProfileModal}
        changeOpen={setopenEditProfileModal}
        user={user}
      />
      <div className="flex-col h-full justify-center items-center m-auto py-5 px-6 md:px-10">
        <div className="w-full h-full p-6 rounded-lg md:shadow-2xl">
          <p className=" text-3xl font-semibold mb-3 mx-auto h-full text-center">Your Profile</p>
          <div className=" mt-8 w-full ">
            <div className="bg-gray-500 w-36 h-36 rounded-full mx-auto mb-6"></div>
            <div className="flex-col">
              <div className="py-6 flex gap-x-10 justify-center">
                <div>
                  <p className=" text-xl font-semibold mb-5">
                    First name:{" "}
                    <span className=" font-normal">{user?.first_name}</span>
                  </p>
                  <p className=" text-xl font-semibold mb-5">
                    Last name:{" "}
                    <span className=" font-normal">{user?.last_name}</span>
                  </p>
                  <p className=" text-xl font-semibold mb-5">
                    Email: <span className=" font-normal">{user?.email}</span>
                  </p>
                  <p className=" text-xl font-semibold mb-5">
                    Joined On:{" "}
                    <span className=" font-normal">
                      {user?.created
                        ? formatDate(user?.created, transactionDateFormat)
                        : null}
                    </span>
                  </p>
                </div>
                
              </div>
              <div className="flex justify-center">
                <button
                  className="w-full m-auto max-w-xs bg-accent-orange hover:bg-opacity-90 hover:text-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setopenEditProfileModal(true)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
