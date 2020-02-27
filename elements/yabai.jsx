import { styled } from "uebersicht";

import computeBatteryColor from "../lib/batteryColor";
import theme from "../lib/theme";

const render = ({ total, current, battery }) => (
  <YabaiSectionBackground batteryAmt={battery}>
    {current + " of " + total}
  </YabaiSectionBackground>
);

const YabaiSectionBackground = styled("span")(props => ({
  lineHeight: theme.barHeight,
  padding: theme.fontSize,
  background: computeBatteryColor(props.batteryAmt),
  color: theme.background,
  overflow: "hidden"
}));

export default render;
