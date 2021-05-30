import React from 'react';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../customTreeSlice';

function PhotoUpload (props) {
  const { form, imagePreviewUrl, handleChange, handleSubmit } = props;
  const dispatch = useDispatch();

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (<img src={imagePreviewUrl} />);
  } else if (form.imageUrl) {
    $imagePreview = (<img src={form.imageUrl} />);
  }
  
  return (
    <div className="container-relative">
      <form onSubmit={handleSubmit}>
        <input className="fileInput" 
          type="file"
          name="File"
          id="fileImg"
          onChange={handleChange} 
        />
      </form>
      <div className="imgPreview">
        {$imagePreview}
      </div>
    </div>
  )
}
export default PhotoUpload;
