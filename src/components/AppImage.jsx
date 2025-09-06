import React from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ background: '#fff', objectFit: 'cover', ...props.style }}
      onError={(e) => {
        e.target.src = "/assets/images/solar.jpg";
        e.target.style.background = '#f3f4f6';
        e.target.style.objectFit = 'contain';
      }}
      {...props}
    />
  );
}

export default Image;
