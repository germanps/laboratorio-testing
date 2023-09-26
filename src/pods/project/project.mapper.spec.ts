import { mapProjectFromApiToVm } from './project.mapper'
import * as viewModel from './project.vm'
import * as apiModel from './api/project.api-model'

describe('./pods/project/project.mappers', () => {
  it('should return empty project when feeds undefined', () => {
    //Arrange
    const project = undefined
    //Act
    const result = mapProjectFromApiToVm(project)
    //Assert
    expect(result).toEqual(viewModel.createEmptyProject())
  })

  it('should return empty array when feeds null', () => {
    //Arrange
    const projectApi = null
    //Act
    const result = mapProjectFromApiToVm(projectApi)
    //Assert
    expect(result).toEqual(viewModel.createEmptyProject())
  })

  it('should return expected result but feeds undefined employees', () => {
    //Arrange
    const employee: apiModel.Project = {
      id: '1',
      name: 'John',
      externalId: '01',
      comments: "Lorem ipsum",
      isActive: true,
      employees: undefined
    }
    const expectedResult: viewModel.Project = {
      id: '1',
      name: 'John',
      externalId: '01',
      comments: "Lorem ipsum",
      isActive: true,
      employees: []
    }
    //Act
    const result = mapProjectFromApiToVm(employee)
    //Assert
    expect(result).toEqual(expectedResult)
  })

  it('should return expected result but feeds null employees', () => {
    //Arrange
    const projectApi: apiModel.Project = {
      id: '1',
      name: 'NanGurth',
      externalId: '01',
      comments: "Lorem ipsum",
      isActive: true,
      employees: null
    }
    const expectedResult: viewModel.Project = {
      id: '1',
      name: 'NanGurth',
      externalId: '01',
      comments: "Lorem ipsum",
      isActive: true,
      employees: []
    }
    //Act
    const result = mapProjectFromApiToVm(projectApi)
    //Assert
    expect(result).toEqual(expectedResult)
  })

  it('should return expected result', () => {
    //Arrange
    const project: apiModel.Project = {
      id: '1',
      name: 'NanGurth',
      externalId: '01',
      comments: "Lorem ipsum",
      isActive: true,
      employees: [{
        id: '1',
        isAssigned: false,
        employeeName: 'John',
      },{
        id: '2',
        isAssigned: true,
        employeeName: 'Lou',
      }]
    }
    const expectedResult: viewModel.Project = {
      id: '1',
      name: 'NanGurth',
      externalId: '01',
      comments: "Lorem ipsum",
      isActive: true,
      employees: [{
        id: '1',
        isAssigned: false,
        employeeName: 'John',
      },{
        id: '2',
        isAssigned: true,
        employeeName: 'Lou',
      }]
    }
    //Act
    const result = mapProjectFromApiToVm(project)
    //Assert
    expect(result).toEqual(expectedResult)
  })
})
