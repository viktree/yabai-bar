import { styled } from "uebersicht";
import theme from "../lib/theme";

const render = ({ total, current, battery }) => (
  <YabaiSectionBackground battery={battery}>
    {current}
    {/* {current + " of " + total} */}
  </YabaiSectionBackground>
);

const YabaiSectionBackground = styled("span")(props => ({
  padding: theme.fontSize,
  background: props.battery,
  color: theme.background
}));

export default render;
