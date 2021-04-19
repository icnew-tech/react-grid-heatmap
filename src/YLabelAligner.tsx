import React from 'react'

interface Props {
  xLabelHeight: number
  isXLabelReverse: boolean
  children: any
}

export default function YLabelAligner({
  xLabelHeight,
  isXLabelReverse,
  children
}: Props) {
  const style = {
    [isXLabelReverse ? 'marginBottom' : 'marginTop']: `${xLabelHeight}px`
  }
  return <div id='aligner' style={style}>{children}</div>
}
