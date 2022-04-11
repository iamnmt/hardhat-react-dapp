import React from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export default function DefaultTab() {
  return (
    <WrapperStyled>
      <h1>Select a contract from the contract list</h1>
    </WrapperStyled>
  )
}
