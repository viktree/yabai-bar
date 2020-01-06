import { styled } from "uebersicht";

import computeBatteryColor from "../lib/batteryColor";
import theme from "../lib/theme";

const render = ({ total, current, battery }) => {
  if (current == 1) {
    return (
      <YabaiSectionBackground batteryAmt={battery}>
        <i className="far fa-envelope" />
      </YabaiSectionBackground>
    );
  }

  if (current == 4) {
    return (
      <YabaiSectionBackground batteryAmt={battery}>
        <i className="fab fa-spotify" />
      </YabaiSectionBackground>
    );
  }

  return (
    <YabaiSectionBackground batteryAmt={battery}>
      {current + " of " + total}
    </YabaiSectionBackground>
  );
};

const YabaiSectionBackground = styled("span")(props => ({
  lineHeight: theme.barHeight,
  padding: theme.fontSize,
  background: computeBatteryColor(props.batteryAmt),
  color: theme.background,
  overflow: "hidden"
}));

export default render;
