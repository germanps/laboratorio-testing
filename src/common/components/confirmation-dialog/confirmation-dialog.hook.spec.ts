import { renderHook, act } from '@testing-library/react'
import { useConfirmationDialog } from './confirmation-dialog.hook'
import { Lookup } from 'common/models'

describe('useConfirmationDialog hook', () => {

  it('should return state default (false)', () => {
    //Arrange
    //Act
    const { result } = renderHook(() => useConfirmationDialog())
    //Assert
    expect(result.current.isOpen).toEqual(false)
  })

  it('should return itemToDelete default props', () => {
    //Arrange
    const defaultItem: Lookup = { id: '', name: '' }
    //Act
    const { result } = renderHook(() => useConfirmationDialog())
    //Assert
    expect(result.current.itemToDelete).toEqual(defaultItem)
  })

  it('should return item to delete and dialog state open (true)', () => {
    //Arrange
    const itemToDelete: Lookup = {id: '1', name: 'John'}
    //Act
    const { result } = renderHook(() => useConfirmationDialog())
    act(() => {
      result.current.onOpenDialog(itemToDelete)
    })
    //Assert
    expect(result.current.isOpen).toEqual(true)
    expect(result.current.itemToDelete).toEqual(itemToDelete)
  })

  it('should return close dialog when delete item', () => {
    //Arrange
    const itemToDelete: Lookup = {id: '1', name: 'John'}
     //Act & Assert
    const { result } = renderHook(() => useConfirmationDialog())
    act(() => {
      result.current.onOpenDialog(itemToDelete)
    })
    expect(result.current.isOpen).toEqual(true)
    //Act & Assert
    act(() => {
      result.current.onClose()
    })
    expect(result.current.onOpenDialog).toBeDefined()
  })

})
