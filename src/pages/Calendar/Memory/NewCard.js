import React, { useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, TextareaAutosize, TextField } from "@material-ui/core";
import { selectUser } from "../../../store/authSlice";
import swal from "sweetalert";
import { useSnackbar } from "notistack";
import { uploadArrayImage, createMemory, CREATING_SPINNER } from "../calendarSlice";
import moment from "moment";

const NewCard = () =>
// props
{
  // const {
  // } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [form, setForm] = useState({ description: "", memoryDate: moment() });
  // eslint-disable-next-line no-unused-vars
  const [urls, setUrl] = useState([]);
  const currentUser = useSelector(selectUser);
  const handleChangeDate = (e) => {
    setForm({ ...form, memoryDate: moment(e.target.value).format("YYYY-MM-DD") });
  };

  const handleChangeDescription = (e) => {
    setForm({ ...form, description: e.target.value });
  };

  const deleteImg = (ind) => {
    setImages(_.concat(_.slice(images, 0, ind), _.slice(images, ind + 1, images.length)));
    setImagesPreview(
      _.concat(
        _.slice(imagesPreview, 0, ind),
        _.slice(imagesPreview, ind + 1, imagesPreview.length)
      )
    );
  };

  const handleChange = (e) => {
    const result = e.target.files;
    setImages([...images, ...e.target.files]);
    const mapUrl = result.length && _.map(result, (ele) => URL.createObjectURL(ele));
    setImagesPreview([...imagesPreview, ...mapUrl]);
  };

  const handleSubmit = async () => {
    if (!form.memoryDate) {
      enqueueSnackbar("Please select memory date!", { variant: "warning" });
      return;
    }
    var formData = new FormData();
    _.forEach(images, (ele) => {
      formData.append("Files", ele);
    });
    dispatch(CREATING_SPINNER());
    const callback = async () => {
      if (formData.entries().next().value && formData.entries().next().value[1].name) {
        return await dispatch(uploadArrayImage(formData));
      }
    };
    const payload = {
      familyTreeId: id,
      description: form.description,
      memoryDate: moment(form.memoryDate).format(),
      imageUrls: await callback(),
    };

    const upload = await dispatch(createMemory(payload));
    if (!upload) {
      swal("Something error! Please try again!");
    } else {
      setForm({ description: "", memoryDate: null });
      setUrl([]);
      setImagesPreview([]);
    }
  };
  return (
    <Grid xs={12} container className="container-card">
      <Grid item xs={1} className="avatar-card">
        <img src={`${currentUser ? currentUser.avatarUrl : "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"}`} />
      </Grid>
      <Grid item xs={11} className="input-card">
        <TextareaAutosize
          className="text-area"
          rowsMin={2}
          value={form.description}
          onChange={handleChangeDescription}
        />
      </Grid>
      <div className="hr" />
      <Grid container xs={12}>
        {imagesPreview.length > 0 &&
            imagesPreview.map((ele, index) => (
              <Grid key={ele.id} xs={6} className="img-item">
                <img src={ele}/>
                <div className="btn-trash" onClick={() => deleteImg(index)}>
                  <i className="fas fa-trash-alt"></i>
                </div>
              </Grid>
            ))}
      </Grid>
      <Grid item xs={6} className="card-flex">
        <label className="card-flex" htmlFor="memory-date">
          <TextField
            id="memory-date"
            type="date"
            label="Memory Date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={form.memoryDate}
            onChange={handleChangeDate}
            style={{ marginLeft: "5px", padding: "1px" }}
          />
        </label>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={2} className="card-flex">
        <label className="card-flex" htmlFor="fileImg">
          <i className="fas fa-image"></i>
          <div style={{ marginLeft: "5px" }}>Image</div>
          <form>
            <input
              className="fileInput"
              type="file"
              multiple
              name="Files"
              id="fileImg"
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </form>
        </label>
      </Grid>
      <Grid item xs={2} className="card-flex" onClick={handleSubmit}>
        <i className="fas fa-save"></i>
        <div style={{ marginLeft: "5px" }}>Save</div>
      </Grid>
    </Grid>
  );
};

export default NewCard;
