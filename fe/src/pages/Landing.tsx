import { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";
import { RegisterSuccessModal } from "../components/Modals/RegisterSuccessModal";
import useAuth from "../utils/useAuth";

export const Landing = () => {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  return user ? (
    <Navigate to={"/home"} replace={true} />
  ) : (
    <>
      <div className="grid md:grid-cols-2 flex-1 bg-money-pattern">
        <div className="flex flex-col justify-center items-center backdrop-filter backdrop-grayscale backdrop-brightness-50">
          <div>
            <p className="text-white font-bold text-7xl md:text-8xl">
              <span className="text-accent-orange text-8xl md:text-9xl">X</span>
              pend
            </p>
            <p className="mt-3 text-white">
              Track your
              <span className="text-accent-orange text-md md:text-lg font-semibold">
                {" spending "}
              </span>
              and
              <span className="text-accent-orange text-md md:text-lg font-semibold">
                {" earnings"}
              </span>
              !
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center backdrop-filter backdrop-grayscale backdrop-brightness-50">
          {isLogin ? (
            <LoginForm handleChangeForm={setIsLogin} />
          ) : (
            <RegisterForm
              handleChangeForm={setIsLogin}
              handleOpenModal={setOpenSuccessModal}
            />
          )}
        </div>
      </div>
      <RegisterSuccessModal
        open={openSuccessModal}
        changeOpen={setOpenSuccessModal}
      />
    </>
  );
};
