import React from 'react'
import styled from 'styled-components'
import Board from './Board'

const WrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

export default function TopFunders({funders}) {
  return (
    <WrapperStyled>
        <h1>Top Funders</h1>
        <Board funders={funders}/>
    </WrapperStyled>
  )
}
