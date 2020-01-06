import { styled } from "uebersicht";

const nothingPlaying = data => data == "" && data.length === 0;

export const render = ({ error, data }, dispatch) => {
  if (error) {
    return <NowPlayingSection />;
  } else if (nothingPlaying(data)) {
    return <NowPlayingSection></NowPlayingSection>;
  } else {
    return (
      <NowPlayingSection>
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
