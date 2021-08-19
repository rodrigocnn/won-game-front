import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Menu from '.'

describe('<Menu />', () => {
  it('should render the Menu', () => {
    renderWithTheme(<Menu />)
    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Open Shopping Cart/i)).toBeInTheDocument()
    //expect(screen.getByRole('img', { name: /won games/i })).toBeInTheDocument()
  }),
    it('should render the Open close mobile menu', () => {
      renderWithTheme(<Menu />)
      const fullMenuElem = screen.getByRole('navigation', { hidden: true })

      // check if menu is hidden
      expect(fullMenuElem.getAttribute('aria-hidden')).toBe('true')
      expect(fullMenuElem).toHaveStyle({ opacity: 0 })

      // if menu was clicked, check if is Open
      fireEvent.click(screen.getByLabelText(/open menu/i))
      expect(fullMenuElem.getAttribute('aria-hidden')).toBe('false')
      expect(fullMenuElem).toHaveStyle({ opacity: 1 })

      // if menu close was clicked, check if is Closed

      fireEvent.click(screen.getByLabelText(/close menu/i))
      expect(fullMenuElem.getAttribute('aria-hidden')).toBe('true')
      expect(fullMenuElem).toHaveStyle({ opacity: 0 })
    }),
    it('should show register bo when logged out', () => {
      renderWithTheme(<Menu />)
      expect(screen.queryByText(/my account/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/wishlist/i)).not.toBeInTheDocument()
      expect(screen.getByText(/login now/i)).toBeInTheDocument()
      expect(screen.getByText(/sign up/i)).toBeInTheDocument()
    }),
    it('should show register bo when logged in', () => {
      renderWithTheme(<Menu username="will" />)
      expect(screen.getByText(/my account/i)).toBeInTheDocument()
      expect(screen.getByText(/wishlist/i)).toBeInTheDocument()
      expect(screen.queryByText(/login now/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument()
    })
})
