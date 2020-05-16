import { styled } from "uebersicht";

import theme from "./lib/theme";
import computeBatteryColor from "./lib/batteryColor";

import { Time, Spotify, Yabai } from "./elements/index.jsx";

const LocalFontAwsomeHeader = () => (
  <link
    rel="stylesheet"
    type="text/css"
    href="bar.widget/assets/font-awesome/css/all.min.css"
  />
);

const FullBar = ({ output, error }) => {
  console.log("vikram", output);
  if (error) {
    console.log(new Date() + " " + error);
    return <Bar>{error}</Bar>;
  }

  try {
    const { spotify, battery, time, yabai } = output;
    const { current, total } = yabai.primary;

    const batteryColour = computeBatteryColor(battery);

    return (
      <Bar>
        <LocalFontAwsomeHeader />
        <Yabai battery={batteryColour} total={total} current={current} />
        <Spotify data={spotify} />
        <Time battery={batteryColour} isCharging={true} time={time} />
      </Bar>
    );
  } catch (e) {
    console.log(new Date());
    console.log("Failed to render one of the bar's subcomponents");
    console.log(e);
    return (
      <Bar>{"Failed to load bar subcomponent bar. See refresh logs."};</Bar>
    );
  }
};

const Bar = styled("div")`
  position: fixed;
  top: 10px;
  right: ${theme.margin};
  left: ${theme.margin};

  background: ${theme.background};
  color: ${theme.foreground};

  height: ${theme.barHeight};
  lineheight: ${theme.barHeight};

  font-family: ${theme.font};
  font-size: ${theme.fontSize};

  overflow: hidden;
`;

export const command = "sh ./bar.widget/scripts/bar.sh";
export const refreshFrequency = 1000; // in ms
export const initialState = { error: "Initializing bar ..." };
export const updateState = event => {
  try {
    return JSON.parse(event.output);
  } catch (error) {
    console.log(new Date());
    console.log("Output of bar.sh is not valid JSON");
    console.log("Output from bar.sh:", event);
    console.log("Output from bar.sh (parsed):", event.output);
    return { error: "Failed to update bar. See refresh logs." };
  }
};
export const render = FullBar;
