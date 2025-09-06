import React from 'react';

const Image = React.forwardRef(({ src, alt = "Image Name", className = "", ...props }, ref) => {
  return (
    <img
      ref={ref}
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
});

Image.displayName = 'Image';

export default Image;
