import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

import NewCard from "./NewCard";
import CardList from "./CardList";

import {
  selectArrMemory,
  fetchMemory,
  // createMemory, deleteMemory
} from "../calendarSlice";

const Memory = () =>
// props
{
  // const {
  // } = props;

  const dispatch = useDispatch();

  const arrMemory = useSelector(selectArrMemory);
  React.useEffect(async () => {
    await dispatch(fetchMemory(21));
  }, []);

  return (
    <Grid xs={10} className="scrollable">
      <NewCard />
      <CardList arrMemory={arrMemory} />
    </Grid>
  );
};

export default Memory;
