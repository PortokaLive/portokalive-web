import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "../utils/store";
import { Header } from "../components/Header";
import { ReactComponent as LandingImg } from "../assets/img/live_landing.svg";
import { ReactComponent as Devices } from "../assets/img/mobile_web.svg";
import { sx } from "../utils/style";

const classes = sx.createStyles({
  landingImgMd: {
    width: "500px",
  },
  landingImgXs: {
    width: "300px",
    height: "300px",
  },
  getStarted: {
    marginTop: "100px",
  },
  textHint: {
    fontSize: "14px",
    marginTop: "30px",
  },
  information: {
    maxWidth: "600px",
    textAlign: "center",
  },
  information2: {
    maxWidth: "600px",
    fontWeight: 500,
  },
  information3: {
    textAlign: "left",
    color: "darkgray",
  },
  footer: {
    marginTop: "300px",
  },
});

export const Landing = ({ history }: any) => {
  const auth = useSelector((state) => state.auth);
  const isMd = window.matchMedia("(min-width: 576px)").matches;

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/app");
    }
  }, [auth, history]);

  const handleDirectRegister = () => {
    history.push("/register");
  };

  return (
    <>
      <Header landing />
      <Row noGutters className="py-1 py-sm-5 mt-1 mt-sm-5">
        {!isMd && (
          <Col xs={12} md={6}>
            <Container
              style={{
                background: `url(${require("../assets/img/globe.png")}`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="d-flex flex-column justify-content-center align-items-center">
              <LandingImg
                style={{ animation: "2s grow infinite" }}
                className={isMd ? classes.landingImgMd : classes.landingImgXs}
              />
            </Container>
          </Col>
        )}
        <Col xs={12} md={6}>
          <Container className="d-flex flex-column justify-content-center align-items-center">
            <div className={classes.getStarted}>
              <h1 className="mb-5">
                Live Streaming App
                <br />
                <span>for you.</span>
              </h1>
              <Button size="lg" onClick={handleDirectRegister}>
                Create your account
              </Button>
              <div className={classes.textHint}>
                Already a member? <NavLink to="/login">Login</NavLink>
              </div>
            </div>
          </Container>
        </Col>
        {isMd && (
          <Col xs={12} md={6}>
            <Container
              style={{
                background: `url(${require("../assets/img/globe.png")}`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="d-flex flex-column justify-content-center align-items-center">
              <LandingImg
                style={{ animation: "2s grow infinite" }}
                className={isMd ? classes.landingImgMd : classes.landingImgXs}
              />
            </Container>
          </Col>
        )}
      </Row>
      <Container className="d-flex flex-column justify-content-center align-items-center pt-4">
        <h2 className="text-center">
          Share your life real-time or
          <br />
          Watch others
        </h2>
        <div className={classes.information}>
          <p>
            Our video platform is for you to broadcast your live video to global
            audience. Even if you are not interested to go live, you can watch
            others and have fun!
          </p>
        </div>
        <Row noGutters>
          <Col xs={12} md={6}>
            <Container className="d-flex flex-column justify-content-center align-items-center">
              <Devices
                className={isMd ? classes.landingImgMd : classes.landingImgXs}
              />
            </Container>
          </Col>
          <Col xs={12} md={6}>
            <Container className="d-flex flex-column justify-content-center h-100 ml-4">
              <Card className="m-1">
                <Card.Body>
                  Both mobile and web versions are available.
                </Card.Body>
              </Card>
              <Card className="m-1">
                <Card.Body>We can watch on web and record on mobile.</Card.Body>
              </Card>
              <Card className="m-1">
                <Card.Body>Both with beautiful and easy-to-use UI/UX</Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
        <Row className="w-100 my-3">
          <Col xs={12} md={7} className="ml-3 ml-sm-5 mt-5 mt-sm-3">
            <h2>Mobile Application</h2>
            <div className={classes.information2}>
              <p>
                Our live streaming app is available on Android platform
                PlayStore. Use this app to record live videos and make them
                available for everyone on the platform to watch. We have used
                api.video free tier (development only) to host our broadcast
                server.
              </p>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <a href="https://play.google.com/store/apps/details?id=com.portokalive&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
              <img
                style={{ maxWidth: "300px" }}
                alt="Get it on Google Play"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              />
            </a>
          </Col>
        </Row>
      </Container>
      <Card.Footer className={classes.footer + " px-5"}>
        <div className={classes.information3}>
          <h4>About</h4>
          <p>
            We are sorry to inform you in this last section that all the above
            information are not true and stated there as a proof-of-concept
            demonstration purpose only.
            <br />
            In reality, PortokaLive is an open-source experimental platform for
            broadcasting live stream using free tier hosting of api.video (for
            development). You can find us{" "}
            <a href="https://github.com/PortokaLive/portokalive-web/">
              here on GitHub
            </a>
            .
            <br />
            <br />
            <span className={classes.textHint}>
              However, you can use both the web app and mobile app perfectly and
              also able to use the live streaming if you are not bothered by the
              watermark of api.video.
            </span>
            <br />
            <br />
            <br />
            <span className="font-weight-bold">
              Crafted with{" "}
              <span role="img" aria-label="heart">
                ❤️
              </span>{" "}
              by <a href="https://kevinmoemyintmyat.gitlab.io">m3yevn</a>
            </span>
          </p>
        </div>
      </Card.Footer>
    </>
  );
};
