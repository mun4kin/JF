import * as React from 'react'
import { render } from '@testing-library/react'
import StatusPicker from './StatusPicker'

describe('Test <RatePicker/> component', () => {
  it('should be render RatePicker component', () => {
    render(<StatusPicker />)
  })
})