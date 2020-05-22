import { styled } from "uebersicht";
import theme from "../lib/theme";

const render = ({ error, battery, time }) => {
  if (error) {
    <ClockSectionBackground battery={battery} />;
  }

  return (
    <ClockSectionBackground battery={battery}>
      <ClockIcon className="far fa-clock" />
      {time}
    </ClockSectionBackground>
  );
};

const ClockIcon = styled("i")`
  padding: 0 5px;
  overflow: hidden;
`;

const ClockSectionBackground = styled("span")(props => ({
  padding: "0.4%",
  background: props.battery,
  color: theme.background,
  float: "right"
}));

export default render;
