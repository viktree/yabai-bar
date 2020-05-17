import { styled } from "uebersicht";

import theme from "./lib/theme";

import { Time, Spotify, Yabai } from "./elements/index.jsx";

const LocalFontAwsomeHeader = () => (
  <link
    rel="stylesheet"
    type="text/css"
    href="bar.widget/assets/font-awesome/css/all.min.css"
  />
);

const USE_BASE_TEN = 10;

const computeBatteryColor = data => {
  const level = parseInt(data, USE_BASE_TEN);
  if (level > 90) return "#A1BA89";
  if (level > 50) return "#7D837B";
  if (level > 15) return "#87A0B2";
  if (level > 8) return "#F2C57C";
  return "#E57373";
};

const FullBar = ({ output, error }) => {
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
