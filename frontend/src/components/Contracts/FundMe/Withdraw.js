import React from 'react'
import { Button } from 'antd'

export default function Withdraw({handleWithdraw}) {
  return (
    <Button onClick={handleWithdraw} type="danger">Withdraw</Button>
  )
}
