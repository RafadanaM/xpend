import LoginForm from "../components/LoginForm"

export const Landing = () => {
  return (
    <div className="grid grid-cols-2 m-auto">
      <div>Landing page</div>
      <div className=""><LoginForm/></div>
    </div>
  );
};
