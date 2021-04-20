import React from "react";

// MUI
import { Container, Grid, Paper, Typography } from "@material-ui/core";

// custom components
import SearchBox from "../../components/Search/Search";
import CardMember from "./components/CardMember/CardMember";
import ToolSet from "./components/ToolSet/ToolSet";
import CustomToggleButton from "./components/CustomToggleButton/CustomToggleButton";
import ListMember from "./components/ListMember/ListMember";

import data from "../../data";
import useCustomTreePageStyles from "./useCustomTreePageStyles";

// sample data
const memberInfo = data.memberInfoSample;

export default function CustomTreePage() {
  const classes = useCustomTreePageStyles();

  return (
    <Container maxWidth="xl" disableGutters className={classes.container}>
      <Grid container direction="row">
        {/* Left side */}
        <Grid item xs={2}>
          {/* Container of Left Side */}
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12}></Grid>
            {/* Family name */}
            <Grid item xs={11}>
              <Paper elevation={9} className={classes.paperPanel}>
                <Typography
                  align="center"
                  variant="h5"
                  component="p"
                  className={classes.boldTitle}
                >
                  Family 01
                </Typography>
              </Paper>
            </Grid>

            {/* Search box*/}
            <Grid item xs={11}>
              <SearchBox ariaLabel="search for people in this family" />
            </Grid>

            {/* Info of a member */}
            <Grid item xs={11}>
              <CardMember
                avatarUrl={memberInfo.avatarUrl}
                name={memberInfo.name}
                birth={memberInfo.birth}
                dead={memberInfo.dead}
                sex={memberInfo.sex}
                relationship={memberInfo.relationship}
              />
            </Grid>

            {/* Structure of family tree */}
            <Grid item xs={11}>
              <ListMember
                className={classes.paperPanel}
                members={data.family01}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Grid>

        {/* Right side - Main side */}
        <Grid item xs={10}>
          {/* Container fo Right side */}
          <Grid container>
            {/* Mode action */}
            <Grid item xs={12} container justify="center">
              <Typography
                gutterBottom
                variant="h4"
                component="p"
                className={classes.actionTitle}
              >
                SELECT MODE
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justify="center"
              className={classes.toggleButtons}
            >
              <CustomToggleButton />
            </Grid>
            <Grid item xs={12}>
              {/* replace the paper component below with the gojs editor */}
              <Paper
                elevation={10}
                style={{
                  height: "80vh",
                  margin: "0px 16px",
                  borderRadius: "24px",
                }}
              >
                <Typography gutterBottom style={{ marginLeft: "16px" }}>
                  This is editable area
                </Typography>
                <ToolSet className={classes.toolSet} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
