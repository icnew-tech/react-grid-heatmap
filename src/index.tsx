import * as React from 'react'
import Cell from './Cell'
import Row from './Row'
import XLabels from './XLabels'
import Column from './Column'
import YLabels from './YLabels'
import YLabelAligner from './YLabelAligner'
import useElemetHeight from './useElemetHeight'

interface Props {
  data: number[][]
  xLabels?: string[]
  yLabels?: string[]
  cellHeight?: string
  square?: boolean
  xLabelsPos?: 'top' | 'bottom'
  yLabelsPos?: 'left' | 'right'
  xLabelsStyle?: (index: number) => {}
  yLabelsStyle?: (index: number) => {}
  cellStyle?: (x: number, y: number, ratio: number, value: number) => {}
  cellRender?: (x: number, y: number, ratio: number, value: number) => {}
  onClick?: (x: number, y: number, ratio: number, value: number) => void
  headerHeight:number
}

function getMinMax(data: number[][]): [number, number] {
  const flatArray = data.reduce((i, o) => [...o, ...i], [])
  //first row is metadadata, not to be used for min and max
  const oneRow:number =data.length;
  const filteredArray = flatArray.slice(0,(flatArray.length - oneRow));
  const max = Math.max(...filteredArray)
  const min = Math.min(...filteredArray)
  return [min, max]
}

export const HeatMapGrid = ({
  data,
  xLabels,
  yLabels,
  xLabelsPos = 'top',
  yLabelsPos = 'left',
  square = false,
  cellHeight = '2px',
  xLabelsStyle,
  yLabelsStyle,
  cellStyle,
  cellRender,
  onClick,
  headerHeight,
}: Props) => {
  const [xLabelHeight, xLabelRef] = useElemetHeight(22)
  const [min, max] = getMinMax(data)
  const minMaxDiff = max - min
  const isXLabelReverse = xLabelsPos === 'bottom'
  const isYLabelReverse = yLabelsPos === 'right'
  xLabelHeight
  // console.log("External HeaderHeight: " + headerHeight)
  // console.log("Calculated HeaderHeight: " + xLabelHeight)
  return (
    <Row reverse={isYLabelReverse}>
      {yLabels && (
        <YLabelAligner
          xLabelHeight={headerHeight}
          isXLabelReverse={isXLabelReverse}
        >
          <YLabels
            reverse={isYLabelReverse}
            labels={yLabels}
            height={cellHeight}
            yLabelsStyle={yLabelsStyle}
          />
        </YLabelAligner>
      )}
      <Column reverse={isXLabelReverse} grow={!square}>
        <div ref={xLabelRef}>
          {xLabels && (
            <XLabels
              labels={xLabels}
              xLabelsStyle={xLabelsStyle}
              height={cellHeight}
              square={square}
            />
          )}
        </div>
        <Column>
          {data.map((rowItems, xi) => (
            <Row >
              {rowItems.map((value, yi) => (
                <Cell
                  key={`crc${xi}-${yi}`}
                  posX={xi}
                  posY={yi}
                  onClick={onClick}
                  value={value}
                  height={cellHeight}
                  square={square}
                  render={cellRender}
                  style={cellStyle}
                  ratio={(value - min) / minMaxDiff}
                />
              ))}
            </Row>
          ))}
        </Column>
      </Column>
    </Row>
  )
}
