import { render, screen, fireEvent } from '@testing-library/react'

import Message from './Message'

describe('Message component', () => {
    it('should render a message', () => {
        render(<Message variant='error' message='testing'></Message>)
        const testMessage = screen.getByText('testing')
        expect(testMessage).toBeInTheDocument()
    })

    it('should have the correct style', () => {

        render(<Message variant='success' message='success'></Message>)
        const testMessage = screen.getByText('success')
        expect(testMessage).toHaveClass('success')
    })
})
