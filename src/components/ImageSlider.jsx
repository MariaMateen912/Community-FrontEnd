import React from 'react';
import { Box } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
    const images = [
        'https://mittalbuilders.com/wp-content/uploads/2020/12/Reasons-to-settle-down-in-Pune.png',
        'https://i.ytimg.com/vi/fDEL9Z9nDJk/maxresdefault.jpg',
        'https://i.ytimg.com/vi/TSX6mYknm9M/maxresdefault.jpg',
        'https://media.licdn.com/dms/image/D4D12AQGmt9DncNns_g/article-cover_image-shrink_720_1280/0/1687776519855?e=2147483647&v=beta&t=NOQ1QbiTOwgXc0uE2D8i1Y9q1rc36QYT0Y3jT8qGsGI'
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
    <Box ml={250}>
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

