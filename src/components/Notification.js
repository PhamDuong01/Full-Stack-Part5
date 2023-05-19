const Notification = (props) => {
  const { styleMessage, message } = props.message;

  return (
    <div className={`noti ${styleMessage}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
