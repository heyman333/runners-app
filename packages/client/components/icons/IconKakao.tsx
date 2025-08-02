import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

export const IconKakao = () => (
  <Svg width="17" height="16" fill="none" viewBox="0 0 17 16">
    <G clipPath="url(#a)">
      <Path
        fill="#3A1D1D"
        d="M16.61 7.5c0 3.59-3.582 6.5-8 6.5-1.16 0-2.26-.2-3.254-.56a9.3 9.3 0 0 1-1.697.957c-.75.325-1.653.603-2.55.603a.5.5 0 0 1-.356-.853l.01-.01q.013-.012.04-.043.054-.057.153-.178c.128-.157.3-.388.475-.675.313-.52.61-1.2.669-1.966C1.163 10.213.61 8.909.61 7.5c0-3.59 3.58-6.5 8-6.5 4.418 0 8 2.91 8 6.5"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.61 0h16v16h-16z" />
      </ClipPath>
    </Defs>
  </Svg>
);
