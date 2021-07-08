import React from "react";
// MUI
import { Avatar, Card, CardContent, IconButton, Typography } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import useCardMemberStyles from "./useCardMemberStyles";
import ListConnectUser from "./ListConnectUser";
import { getListConnectUser } from "../../customTreeSlice";
import CONSTANTS from "../../../../utils/const";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

export default function CardMember(props) {
  const { model, updateUser } = props;
  const classes = useCardMemberStyles();
  const dispatch = useDispatch();
  const getImage = model.imageUrl || CONSTANTS.sourceDefaultImg;
  
  React.useEffect(async () => {
    const rs = await dispatch(getListConnectUser());
    if (rs) {
      const data = _.map(rs, ele => ({ value: ele.id, label: ele.userName }));
      setOptions(data);
    }
  }, []);

  const [options, setOptions] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (element) => {
    updateUser(model, element);
    setAnchorEl(null);
  };

  return (
    <Card raised className={classes.card}>
      <CardContent>
        <div className={classes.avatarContainer}>
          <Avatar alt="Marc" src={getImage} className={classes.avatar} />
        </div>
        <div className={classes.infoRow}>
          <Typography className={classes.name}>{model.name}</Typography>
          <IconButton size="small">{/* <EditIcon /> */}</IconButton>
        </div>
        {model.name && (
          <div className={classes.infoRow}>
            <Typography>{`Gender: ${model.gender}`}</Typography>
            {/* <LinkIcon
              className={classes.linkIcon}
              onClick={handleClick}
            />
            <ListConnectUser
              open={open}
              anchorEl={anchorEl}
              options={options}
              handleClose={handleClose}
            /> */}
          </div>
        )}
        {model.dob && (
          <div className={classes.infoRow}>
            <Typography>DOB: {model.dob}</Typography>
          </div>
        )}
        {model.dod && (
          <div className={classes.infoRow}>
            <Typography>DOD: {model.dod}</Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
