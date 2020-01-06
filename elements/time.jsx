import { styled } from "uebersicht";

import strftime from "../lib/strftime.js";
import computeBatteryColor from "../lib/batteryColor";
import theme from "../lib/theme";

const render = ({ error, side, battery }) => {
  const dateObj = new Date();
  const date = strftime("%a %d", dateObj);
  const time = strftime("%l:%M", dateObj);

  if (error) {
    <ClockSectionBackground batteryAmt={battery} side={side} />;
  }

  return (
    <ClockSectionBackground batteryAmt={battery} side={side}>
      <ClockIcon className="far fa-clock" />
      {time}
    </ClockSectionBackground>
  );
};

const ClockIcon = styled("i")`
  padding-right: 5px;
`;

const ClockSectionBackground = styled("span")(props => ({
  lineHeight: theme.barHeight,
  padding: "0 1%",
  background: computeBatteryColor(props.batteryAmt),
  color: theme.background,
  overflow: "hidden",
  float: props.side
}));

export default render;
