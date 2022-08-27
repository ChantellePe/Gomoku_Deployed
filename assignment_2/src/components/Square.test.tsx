
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';

import style from './Square.module.css'
import Square from './Square'

const testSeatId = [1, 1]

beforeAll(() => {
    jest.mock('./Square')
})


describe('Square component', () => {
    const moveFunction = jest.fn()
    it('should render a Square', () => {
        //jest.mock('./Square')
        render(<Router><Square id={testSeatId} playerMove={moveFunction} /></Router>)
        expect(screen.getByTestId('square')).toBeInTheDocument()
    })
    it('should appear available', () => {
        // jest.mock('./Square')
        render(<Router><Square id={testSeatId} playerMove={moveFunction} /></Router>)
        expect(screen.getByTestId('square')).toHaveStyle(`background-color:  rgb(255, 205, 253`)
    })
    it('should change color when clicked', () => {
        // jest.mock('./Square')
        render(<Router><Square id={testSeatId} playerMove={moveFunction} /></Router>)
        fireEvent.click(screen.getByTestId('square'))
        expect(screen.getByTestId('square')).toHaveStyle(`background-color:  rgb(255, 255, 255`)
    })
})

