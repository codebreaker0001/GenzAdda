
import { useSelector } from "react-redux";
import "./message.css";
import { format } from "timeago.js";
import UserImage from '../userImage';

export default function Message({ message, own ,currentUser }) {
    // const user = useSelector((state) => state.user)
    console.log(message);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <UserImage image={  message.picturePath } />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
