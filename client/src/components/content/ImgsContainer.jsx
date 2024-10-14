import PropTypes from "prop-types";

const ImgsContainer = ({images}) => {
  return (
    <div className="flex justify-center flex-wrap gap-6 bg-gray-800 text-gray-300 p-6 rounded-2xl shadow-md shadow-gray-400">
      {images.map((image, index) => (
        <img key={index} src={image} alt={"Image" + index} className="w-[350px] object-cover rounded-2xl shadow-md shadow-gray-400"/>
      ))}      
    </div>
  )
};

ImgsContainer.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  text: PropTypes.string
}

export default ImgsContainer
