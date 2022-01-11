const Loading = () => {
  return (
    <div className="flex items-center justify-center gap-x-1.5 mt-5">
      <div className="bg-accent-grey w-1.5 h-6 animate-scale" />
      <div
        style={{ animationDelay: "0.1s" }}
        className="bg-accent-grey w-1.5 h-6 animate-scale"
      />
      <div
        style={{ animationDelay: "0.2s" }}
        className="bg-accent-grey w-1.5 h-6 animate-scale"
      />
      <div
        style={{ animationDelay: "0.3s" }}
        className="bg-accent-grey w-1.5 h-6 animate-scale"
      />
      <div
        style={{ animationDelay: "0.4s" }}
        className="bg-accent-grey w-1.5 h-6 animate-scale"
      />
    </div>
  );
};

export default Loading;
