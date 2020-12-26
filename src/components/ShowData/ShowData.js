import React from "react";
import "./ShowData.css";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CountUp from "react-countup";

let widthIn = 0;
if (window.innerWidth <= 768) {
  widthIn = 12;
} else {
  widthIn = 6;
}

function ShowData({
  infected,
  deaths,
  tested,
  active,
  recovered,
  loading,
  fullFinLoading,
}) {
  return (
    <div>
      {loading && fullFinLoading ? (
        <Container maxWidth="sm">
          <Grid container className="ShowData" justify="center" spacing={3}>
            <Grid item xs={widthIn}>
              <Card className="Deaths">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Deaths
                  </Typography>
                  <Typography variant="h5" component="h2">
                    <CountUp duration={2} start={0} end={deaths}></CountUp>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={widthIn}>
              <Card className="Tested">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Tested
                  </Typography>
                  <Typography variant="h5" component="h2">
                    <CountUp duration={2} start={0} end={tested}></CountUp>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={widthIn}>
              <Card className="Active">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Active
                  </Typography>
                  <Typography variant="h5" component="h2">
                    <CountUp duration={2} start={0} end={active}></CountUp>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={widthIn}>
              <Card className="Recovered">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Recovered
                  </Typography>
                  <Typography variant="h5" component="h2">
                    <CountUp duration={2} start={0} end={recovered}></CountUp>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Card className="Infected">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Infected
                </Typography>
                <Typography variant="h5" component="h2">
                  <CountUp duration={2} start={0} end={infected}></CountUp>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
}

export default ShowData;
