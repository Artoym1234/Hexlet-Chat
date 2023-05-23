const Loading = () => {
  const styleSpener = {
    position: 'absolute',
    top: '50%',
    left: '50%',
  };

  return (
    <div className=" align-middle">
      <div className="spinner-border text-primary" style={styleSpener} role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
    </div>
  );
};
export default Loading;
