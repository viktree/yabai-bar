import { styled, run } from "uebersicht";

const nothingPlaying = data => data == "" && data.length === 0;

export const render = ({ error, data }) => {
  const playPreviousTrack = () =>
    run("osascript -e 'tell application \"Spotify\" to previous track'");

  const pauseTrack = () =>
    run("osascript -e 'tell application \"Spotify\" to pause track'");

  const playNextTrack = () =>
    run("osascript -e 'tell application \"Spotify\" to next track'");

  if (error || nothingPlaying(data)) {
    return "";
  } else {
    return (
      <NowPlayingSection>
        <MusicIcon className="fas fa-backward" onClick={playPreviousTrack} />
        <MusicIcon className="fas fa-pause"    onClick={pauseTrack} />
        <MusicIcon className="fas fa-forward"  onClick={playNextTrack} />
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
