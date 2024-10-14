import imgAbout1 from "../../../assets/img/aboutUs1.jpg";
import imgAbout2 from "../../../assets/img/aboutUs2.jpg";
import TextArticle from "../../content/TextArticle";

const AboutUs = () => {
  const imgsAbout = [imgAbout1, imgAbout2];

  return (
    <section className="p-8 flex flex-col items-center gap-6 mb-10">
      <h1 className="text-center text-4xl lg:text-5xl font-semibold text-gray-800">
        Conoce nuestra historia
      </h1>
      <div className="flex justify-center flex-wrap gap-6 bg-gray-800 text-gray-300 p-6 rounded-2xl shadow-md shadow-gray-400">
        {imgsAbout.map((item, index) => (
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

export default AboutUs;
