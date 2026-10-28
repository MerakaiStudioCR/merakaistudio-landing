export function ContactSignal() {
  return (
    <div className='contact-art' aria-hidden>
      <svg
        className='signal-sculpture'
        viewBox='0 0 420 275'
        role='presentation'
        aria-hidden
      >
        <defs>
          <linearGradient id='signal-panel-back' x1='0' y1='0' x2='1' y2='1'>
            <stop stopColor='#2C6980' stopOpacity='.7' />
            <stop offset='1' stopColor='#072539' stopOpacity='.2' />
          </linearGradient>
          <linearGradient id='signal-panel-front' x1='0' y1='0' x2='1' y2='1'>
            <stop stopColor='#80B5BC' stopOpacity='.55' />
            <stop offset='.58' stopColor='#174A5D' stopOpacity='.42' />
            <stop offset='1' stopColor='#092333' stopOpacity='.85' />
          </linearGradient>
          <linearGradient id='signal-orange-path' x1='0' y1='0' x2='1' y2='1'>
            <stop stopColor='#FFD28D' />
            <stop offset='1' stopColor='#F57F20' />
          </linearGradient>
          <radialGradient id='signal-orange-orb'>
            <stop stopColor='#FFDAA1' />
            <stop offset='.55' stopColor='#F57F20' />
            <stop offset='1' stopColor='#A64913' />
          </radialGradient>
          <filter id='signal-soft-glow'>
            <feGaussianBlur stdDeviation='8' />
          </filter>
        </defs>
        <ellipse
          cx='203'
          cy='239'
          rx='151'
          ry='19'
          fill='#000'
          opacity='.21'
          filter='url(#signal-soft-glow)'
        />
        <g transform='translate(19 -9) rotate(-8 206 144)'>
          <rect
            x='63'
            y='59'
            width='240'
            height='153'
            rx='21'
            fill='url(#signal-panel-back)'
            stroke='#A9CBD3'
            strokeOpacity='.4'
            transform='skewY(-8)'
          />
          <path
            d='M99 128 L273 95 M99 154 L273 121 M99 180 L273 147'
            stroke='#97C2C8'
            strokeOpacity='.16'
          />
          <rect
            x='86'
            y='49'
            width='240'
            height='154'
            rx='21'
            fill='url(#signal-panel-back)'
            stroke='#AEDBE1'
            strokeOpacity='.54'
          />
          <circle cx='123' cy='82' r='4' fill='#F57F20' />
          <circle cx='139' cy='82' r='4' fill='#9BC4CB' />
          <circle cx='155' cy='82' r='4' fill='#9BC4CB' />
          <path
            d='M111 107 H300 M111 171 H300'
            stroke='#A7D6DF'
            strokeOpacity='.22'
          />
          <g className='signal-sheet-front'>
            <rect
              x='120'
              y='26'
              width='240'
              height='154'
              rx='22'
              fill='url(#signal-panel-front)'
              stroke='#CEF2F1'
              strokeOpacity='.74'
              strokeWidth='1.4'
            />
            <rect
              x='140'
              y='45'
              width='69'
              height='7'
              rx='3.5'
              fill='#C8E8E9'
              opacity='.46'
            />
            <rect
              x='140'
              y='61'
              width='44'
              height='5'
              rx='2.5'
              fill='#C8E8E9'
              opacity='.26'
            />
            <path
              className='signal-path'
              d='M144 139 C180 104 191 145 228 108 S289 93 333 57'
              fill='none'
              stroke='url(#signal-orange-path)'
              strokeWidth='3'
              strokeLinecap='round'
            />
            <path
              d='M144 139 C180 104 191 145 228 108 S289 93 333 57'
              fill='none'
              stroke='#F57F20'
              strokeOpacity='.15'
              strokeWidth='15'
            />
            <circle
              cx='144'
              cy='139'
              r='6'
              fill='#F57F20'
              stroke='#FFD9A0'
              strokeWidth='2'
            />
            <circle
              cx='333'
              cy='57'
              r='6'
              fill='#F57F20'
              stroke='#FFD9A0'
              strokeWidth='2'
            />
            <circle
              className='signal-nucleus'
              cx='228'
              cy='108'
              r='25'
              fill='url(#signal-orange-orb)'
            />
            <circle
              cx='228'
              cy='108'
              r='38'
              fill='none'
              stroke='#F7B56B'
              strokeOpacity='.35'
            />
            <path
              d='M147 157 H205 M250 157 H333'
              stroke='#C8E7EA'
              strokeOpacity='.35'
              strokeWidth='3'
              strokeLinecap='round'
            />
          </g>
        </g>
      </svg>
      <span className='art-caption'>FROM CONCEPT TO REALITY / MERAKAI®</span>
    </div>
  )
}
