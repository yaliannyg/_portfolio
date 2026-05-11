function Loader() {
  return (
    <div className="absolute bg-transparent  backdrop-blur-xs z-50">
      <div className="w-screen h-screen relative ">
        <div className="absolute left-1/2 top-1/2 -translate-1/2">
          <div className="pixel-loader z-50"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
