import { useNavigate } from "react-router-dom";
import teamWork1 from "../../../assets/img/teamWork1.jpg";
import teamWork2 from "../../../assets/img/teamWork2.jpg";
import teamWork3 from "../../../assets/img/teamWork3.jpg";
import TextArticle from "../../content/TextArticle";

const JoinUs = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/empleo");
  }
  const imgsTeamWork = [teamWork1, teamWork2, teamWork3];

  return (
    <section className="p-8 flex flex-col items-center gap-6 mb-10">
      <h1 className="text-center text-4xl lg:text-5xl font-semibold text-gray-800">
        Únete a nuestra familia
      </h1>
      <button
          className="px-8 py-2 bg-emerald-400 rounded-xl text-gray-900 font-semibold shadow-md shadow-gray-800 hover:bg-emerald-500 hover:text-gray-100 transition duration-300"
          name="btnLoginOrder" onClick={handleClick}
        >
          Inscríbete
        </button>
      <div className="flex justify-center flex-wrap gap-6 bg-gray-800 text-gray-300 p-6 rounded-2xl shadow-md shadow-gray-400">
        {imgsTeamWork.map((item, index) => (
          <div key={index} className="text-center">
            <img
              src={item}
              alt={"Image" + index}
              className="w-[350px] h-[400px] object-cover rounded-2xl shadow-md shadow-gray-400 mb-4"
            />
          </div>
        ))}
      </div>
      <TextArticle />
    </section>
  );
};

export default JoinUs
