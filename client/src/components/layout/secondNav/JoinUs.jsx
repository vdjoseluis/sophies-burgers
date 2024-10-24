import { useNavigate } from "react-router-dom";
import teamWork1 from "../../../assets/img/teamWork1.jpg";
import teamWork2 from "../../../assets/img/teamWork2.jpg";
import teamWork3 from "../../../assets/img/teamWork3.jpg";
import TextArticle from "../../content/TextArticle";
import ImgsContainer from "../../content/ImgsContainer";

const JoinUs = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/empleo");
  }
  const imgsTeamWork = [{src: teamWork1}, {src: teamWork2}, {src: teamWork3}];

  return (
    <section className="flex flex-col p-8 items-center gap-6 mb-10">
      <h1 className="text-center text-4xl lg:text-5xl font-semibold text-gray-800 mt-4 text-shadow">
        Únete a nuestra familia
      </h1>
      <button
          className="px-8 py-2 bg-green-400 rounded-xl text-gray-900 font-semibold shadow-md shadow-gray-800 hover:bg-green-600 hover:text-white transition duration-300"
          name="btnLoginOrder" onClick={handleClick}
        >
          Inscríbete
        </button>
        <ImgsContainer images={imgsTeamWork} />
      <TextArticle />
    </section>
  );
};

export default JoinUs
