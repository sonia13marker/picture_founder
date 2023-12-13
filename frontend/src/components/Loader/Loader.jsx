import './Loader.scss';

export default function Loader () {
    return (
      <div className='main'>
      <svg className="pl1" viewBox="0 0 128 128" width="128px" height="128px">
        <defs>
          <mask id="pl-mask">
            <rect x="0" y="0" width="128" height="128" fill="url(#pl-grad)" />
          </mask>
        </defs>
        <g fill="#9E76E9">
          <g className="pl1__g">
            <g transform="translate(20,20) rotate(0,44,44)">
              <g className="pl1__rect-g">
                <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" transform="translate(0,48)" />
              </g>
              <g className="pl1__rect-g" transform="rotate(180,44,44)">
                <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" transform="translate(0,48)" />
              </g>
            </g>
          </g>
        </g>
        <g fill="#9E76E9" mask="url(#pl-mask)">
          <g className="pl1__g">
            <g transform="translate(20,20) rotate(0,44,44)">
              <g className="pl1__rect-g">
                <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" transform="translate(0,48)" />
              </g>
              <g className="pl1__rect-g" transform="rotate(180,44,44)">
                <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" />
                <rect className="pl1__rect" rx="8" ry="8" width="40" height="40" transform="translate(0,48)" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
    )
}