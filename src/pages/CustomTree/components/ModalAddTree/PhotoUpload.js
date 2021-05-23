import React from 'react';

function PhotoUpload (props) {
  const { imagePreviewUrl, handleChangeImage } = props;

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (<img src={imagePreviewUrl} />);
  }
  
  return (
    <div className="container-relative">
      <input className="fileInput" 
        type="file" 
        onChange={handleChangeImage} />
      <div className="imgPreview">
        {$imagePreview}
      </div>
    </div>
  )
}
export default PhotoUpload;
