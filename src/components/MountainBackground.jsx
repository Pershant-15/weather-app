import Box from '@mui/material/Box';

// A flat, layered mountain scene drawn as an SVG. Every shape uses one solid
// fill, so there are no gradients. It sits behind everything and ignores clicks.
const STARS = [
  [90, 60], [210, 150], [330, 90], [450, 200], [560, 70], [680, 160], [790, 50],
  [900, 130], [1010, 80], [1120, 190], [1260, 60], [1350, 140], [150, 240],
  [620, 250], [960, 250], [1400, 230], [40, 170], [740, 110],
];

const FAR_RANGE =
  'M0 600 L0 380 L120 300 L200 340 L320 230 L420 320 L520 270 L640 360 L760 250 ' +
  'L880 330 L1000 210 L1120 320 L1240 270 L1340 330 L1440 290 L1440 600 Z';
const MID_RANGE =
  'M0 600 L0 450 L140 360 L240 420 L380 330 L500 430 L640 380 L780 450 L900 360 ' +
  'L1040 440 L1180 370 L1320 450 L1440 400 L1440 600 Z';
const NEAR_RANGE =
  'M0 600 L0 520 L180 470 L300 520 L460 460 L620 530 L800 480 L960 540 L1120 490 ' +
  'L1280 540 L1440 500 L1440 600 Z';

// Snow sits above a jagged line on each tall peak and is clipped to the range.
const SNOW_CAPS = [
  '250,180 390,180 390,262 360,250 340,268 320,254 300,270 280,252 250,262',
  '690,200 830,200 830,282 800,272 782,290 760,276 742,292 722,274 690,284',
  '930,160 1070,160 1070,246 1040,236 1022,254 1000,240 982,256 962,238 930,248',
];

export default function MountainBackground() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: 'background.default',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="far-range-clip">
            <path d={FAR_RANGE} />
          </clipPath>
        </defs>

        {STARS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#cfd8e3" opacity="0.45" />
        ))}
        <circle cx="1180" cy="130" r="30" fill="#e8edf3" opacity="0.9" />

        <g transform="translate(0 300)">
          <path d={FAR_RANGE} fill="#1b2533" />
          <g clipPath="url(#far-range-clip)">
            {SNOW_CAPS.map((points) => (
              <polygon key={points} points={points} fill="#3a4859" />
            ))}
          </g>
          <path d={MID_RANGE} fill="#131b26" />
          <path d={NEAR_RANGE} fill="#0e141c" />
        </g>
      </svg>
    </Box>
  );
}
