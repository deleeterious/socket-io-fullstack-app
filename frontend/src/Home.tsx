import { useNavigate } from "react-router-dom";
import { useStore } from "./context";

export const Home = () => {
  const navigate = useNavigate();
  const { userName, setUserName } = useStore();

  const handleJoin = () => {
    navigate("/rooms");
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        className=" h-10"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button
        className="border-stone-900 border-2"
        type="button"
        onClick={handleJoin}
      >
        Join
      </button>
    </div>
  );
};
