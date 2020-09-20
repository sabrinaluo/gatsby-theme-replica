import React, { CSSProperties, FC, useContext, useState } from 'react';
import styled from 'styled-components';

import { CalendarContext } from './CalendarContext';
import { WEEK_DAY_TEXT, getCalendarData } from './utils';

const StyledSvg = styled.svg`
  text {
    fill: #767676;
    font-size: 9px;
  }

  rect {
    shape-rendering: geometricPrecision;
    outline: 1px solid rgba(27, 31, 35, 0.04);
    outline-offset: -1px;
    rx: 2;
    ry: 2;
  }
`;

const WeekDayLabel = () => {
  return (
    <>
      {WEEK_DAY_TEXT.map((d, index) => (
        <text
          key={d}
          className={index % 2 === 0 ? 'hidden' : undefined}
          dx='-9'
          dy={8 + index * 13}
        >
          {d}
        </text>
      ))}
    </>
  );
};

interface SvgTipState {
  style: CSSProperties;
  date?: string;
  text?: string;
}

interface Props {
  onDateClick?: (date: string) => void;
}

const ContributionGraph: FC<Props> = () => {
  const { data, monthData } = getCalendarData();
  const [svgTip, setSvgTip] = useState<SvgTipState>({
    style: { display: 'none' },
  });
  const handleMouseEnterSvg = (e: React.MouseEvent<SVGRectElement>) => {
    const target = e.currentTarget;
    const date = target.dataset.date as string;
    const count = Number(target.dataset.count);
    const x = Number(target.getAttribute('x'));
    const y = Number(target.getAttribute('y'));

    setSvgTip({
      text: `${count > 0 ? count : 'No'} contribution${
        count === 1 ? ' ' : 's '
      }`,
      date: new Date(date).toLocaleDateString('en', {
        month: 'short',
        year: 'numeric',
        day: 'numeric',
      }),
      //todo fine tune svgtip position
      style: {
        top: y - 15 + 'px',
        left: 150 - x * 11 + 'px',
      },
    });
  };

  const handleMouseLeaveSvg = () => {
    setSvgTip({ style: { display: 'none' } });
  };

  const { state, dispatch } = useContext(CalendarContext);

  const handleSvgClick = (e: React.MouseEvent<SVGRectElement>) => {
    const target = e.currentTarget;
    const date = target.dataset.date as string;
    dispatch({
      type: 'date',
      payload: date,
    });
  };

  const getRectOpacity = (date: string) => {
    if (!state.date) return '';
    return state.date === date ? '' : 'opacity-50';
  };

  return (
    <div className={`relative border-b px-4 pb-2 pt-1`}>
      <div
        className={`overflow-hidden flex flex-col items-end xl:items-center`}
      >
        <StyledSvg width={722} height={112}>
          <g transform={'translate(10, 20)'}>
            {data.map((col) => (
              <g
                key={col.translateX}
                transform={`translate(${col.translateX},0)`}
              >
                {col.week.map((day) => (
                  <rect
                    className={getRectOpacity(day.date)}
                    key={day.date}
                    width='10'
                    height='10'
                    x={day.x}
                    y={day.y}
                    fill='#ebedf0'
                    data-count='0'
                    data-date={day.date}
                    onMouseEnter={handleMouseEnterSvg}
                    onMouseLeave={handleMouseLeaveSvg}
                    onClick={handleSvgClick}
                  />
                ))}
              </g>
            ))}

            {monthData.map((m, index) => (
              <text key={`${m.text}_${index}`} x={m.x} y={-7}>
                {m.text}
              </text>
            ))}

            <WeekDayLabel />
          </g>
        </StyledSvg>
      </div>
      <div
        className={`flex flex-col md:flex-row md:justify-between md:items-center flex-wrap text-11px mt-1 md:mx-4`}
      >
        <a>Learn how we count contributions.</a>
        <div className={`self-end text-gray-main items-center flex`}>
          Less
          <ul className={`calendar-legend`}>
            <li className={`bg-gray-120`} />
            <li className={`bg-green-superlight`} />
            <li className={`bg-green-light`} />
            <li className={`bg-green-medium`} />
            <li className={`bg-green-dark`} />
          </ul>
          More
        </div>
      </div>
      <div
        className={`absolute bg-gray-dark text-gray-light text-xs opacity-75 rounded-md p-2`}
        style={svgTip.style}
      >
        <strong>{svgTip.text}</strong>on {svgTip.date}
      </div>
    </div>
  );
};

export default ContributionGraph;
