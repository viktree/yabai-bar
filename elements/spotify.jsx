import { styled, run } from "uebersicht";

const nothingPlaying = data => data == "" && data.length === 0;

export const render = ({ error, data }) => {
  const sendEvent = async () => {
    const output = await run(
      "osascript -e 'tell application \"Spotify\" to next track'"
    );
    console.log(output);
  };

  if (error) {
    return <NowPlayingSection />;
  } else if (nothingPlaying(data)) {
    return <NowPlayingSection />;
  } else {
    return (
      <NowPlayingSection onClick={sendEvent}>
        <MusicIcon className="fas fa-music" />
        {data}
      </NowPlayingSection>
    );
  }
};

const NowPlayingSection = styled("span")`
  line-height: 25px;
  padding-left: 10px;
`;

const MusicIcon = styled("div")`
  margin-right: 10px;
`;

export default render;
