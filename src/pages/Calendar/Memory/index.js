import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";

import NewCard from "./NewCard";
import CardList from "./CardList";

import {
  selectArrMemory,
  fetchMemory,
  // createMemory, deleteMemory
} from "../calendarSlice";

const Memory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const arrMemory = useSelector(selectArrMemory);
  React.useEffect(async () => {
    await dispatch(fetchMemory(id));
  }, []);

  return (
    <Grid xs={10} className="scrollable">
      <NewCard />
      <CardList arrMemory={arrMemory} />
    </Grid>
  );
};

export default Memory;
