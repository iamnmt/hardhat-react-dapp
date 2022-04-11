import React, { Component } from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`


export default class SimpleStorage extends Component {
  render() {
    return (
      <WrapperStyled>
        <h1>Simple Storage</h1>
        <p>Not Implemented yet</p>
      </WrapperStyled>
    )
  }
}
