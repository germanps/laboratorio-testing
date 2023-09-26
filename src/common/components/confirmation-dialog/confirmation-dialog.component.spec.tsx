import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { ConfirmationDialogComponent } from './confirmation-dialog.component'

describe('ConfirmationDialogComponent', () => {

  it('should not render when isOpen is false', () => {
    //Arrange
    const props = {
      isOpen: false,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: '',
      labels: {
        closeButton: '',
        acceptButton: '',
      },
      children: null,
    }
    //Act
    render(<ConfirmationDialogComponent {...props} />)
    const dialogComponent = screen.queryByRole('dialog')
    //Assert
    expect(dialogComponent).not.toBeInTheDocument()
  })

  it('should render when required props are passed', () => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Dialog heading',
      labels: {
        closeButton: 'closeButton',
        acceptButton: 'acceptButton',
      },
      children: <div id='contentId1'>dialog content</div>,
    }
    //Act
    render(<ConfirmationDialogComponent {...props} />)
    const title = screen.getByRole('heading', { name: 'Dialog heading' })
    const content = screen.getByText('dialog content')
    const accepBtn = screen.getByRole('button', { name: 'acceptButton' })
    const closeBtn = screen.getByRole('button', { name: 'closeButton' })
    //Assert
    expect(title).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    expect(accepBtn).toBeInTheDocument()
    expect(closeBtn).toBeInTheDocument()
  })

  it('should call onClose method when click event on close button', async() => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Dialog heading',
      labels: {
        closeButton: 'closeButton',
        acceptButton: 'acceptButton',
      },
      children: <div id='contentId2'>dialog content</div>,
    }
    //Act
    render(<ConfirmationDialogComponent {...props} />)
    const closeBtn = screen.getByRole('button', { name: 'closeButton' })
    await userEvent.click(closeBtn)
    // Assert
    expect(props.onClose).toHaveBeenCalled()
  })

  it('should call onAccept method when click event on accept button', async() => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Dialog heading',
      labels: {
        closeButton: 'closeButton',
        acceptButton: 'acceptButton',
      },
      children: <div id='contentId3'>dialog content</div>,
    }
    //Act
    render(<ConfirmationDialogComponent {...props} />)
    const accepBtn = screen.getByRole('button', { name: 'acceptButton' })
    await userEvent.click(accepBtn)
    //Assert
    expect(props.onAccept).toHaveBeenCalled()
    expect(props.onClose).toHaveBeenCalled()
  })

})
