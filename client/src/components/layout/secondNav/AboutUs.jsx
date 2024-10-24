import imgAbout1 from "../../../assets/img/aboutUs1.jpg";
import imgAbout2 from "../../../assets/img/aboutUs2.jpg";
import TextArticle from "../../content/TextArticle";
import ImgsContainer from "../../content/ImgsContainer";

const AboutUs = () => {
  const imgsAbout = [{src: imgAbout1}, {src: imgAbout2}];

  return (
    <section className="p-8 flex flex-col items-center gap-6 mb-10">
      <h1 className="text-center text-4xl lg:text-5xl font-semibold text-gray-800 text-shadow">
        Conoce nuestra historia
      </h1>
      <ImgsContainer images={imgsAbout} />
      
      <TextArticle />
    </section>
  );
};

export default AboutUs;
