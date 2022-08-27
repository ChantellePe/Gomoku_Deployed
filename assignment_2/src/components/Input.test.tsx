import { render, screen } from '@testing-library/react'
import Input from './Input'

describe('Input component', () => {
    it('should render', () => {
        render(<Input></Input>)
        const input = screen.getByTestId('input')
        expect(input).toBeInTheDocument()
    })

    it('should have the correct style', () => {
        render(<Input></Input>)
        const input = screen.getByTestId('input')
        expect(input).toHaveClass('input')
    })
})

