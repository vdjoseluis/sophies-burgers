import PropTypes from "prop-types";

const ImgsContainer = ({ images }) => {
  return (
    <div className="flex justify-center flex-wrap gap-6 bg-gray-700 p-6 rounded-3xl shadow-lg shadow-gray-300">
      {images.map((image, index) => (
        <figure key={index} className="w-[350px] h-[350px] flex flex-col items-center justify-center bg-gray-800 overflow-hidden rounded-3xl shadow-xl shadow-gray-400">
          <img
            src={image.src}
            alt={`Image ${index}`}
            className="w-full h-full object-cover"
          />
          {image.caption && (
            <figcaption className="text-center m-2 text-md text-gray-300">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};

ImgsContainer.propTypes = {  
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      caption: PropTypes.string,
    })
  ).isRequired,
};

export default ImgsContainer;
