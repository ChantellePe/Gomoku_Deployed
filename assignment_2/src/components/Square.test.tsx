
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';

import Square from './Square'

const testSeatId = [1, 1]


describe('Square component', () => {
    const moveFunction = jest.fn()
    it('should render a Square', () => {
        render(<Router><Square id={testSeatId} playerMove={moveFunction} /></Router>)
        expect(screen.getByTestId('square')).toBeInTheDocument()
    })
})