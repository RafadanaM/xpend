import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="grid grid-cols-2 h-full bg-secondary">
      <div className="flex flex-col justify-center items-center">
        <div>
          <p className="font-bold text-8xl">
            <span className="text-accent-orange text-9xl">X</span>pend
          </p>
          <p className="mt-3">
            Track your
            <span className="text-accent-orange text-lg font-semibold">
              {" spending "}
            </span>
            and
            <span className="text-accent-orange text-lg font-semibold">
              {" earnings"}
            </span>
            !
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {isLogin ? <LoginForm handleChangeForm={setIsLogin} /> : <RegisterForm handleChangeForm={setIsLogin} />}
      </div>
    </div>
  );
};
