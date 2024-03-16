import React from 'react';
import { Box } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
    const images = [
        'https://placebear.com/g/200/200',
        'https://source.unsplash.com/user/c_v_r/1900',
        'https://via.placeholder.com/300.png/09f/fff',
      ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const imageStyle = {
    height: '650px', // Set your desired height here
    objectFit: 'cover', // Ensures the image covers the specified height
    width: '75%', // Ensures the image takes the full width of its container
  };

  return (
    <Box>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index}>
            <img src={image} alt={`Slide ${index + 1}`}  style={imageStyle}/>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;

