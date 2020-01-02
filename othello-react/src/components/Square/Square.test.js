import React from 'react'
import { configure, mount } from 'enzyme'
import TestRenderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import Square from './Square'

configure({ adapter: new Adapter() })

let renderer
const click = jest.fn()
beforeEach(() => {
  renderer = mount(
    <Square
      rowI={2}
      colI={3}
      value={'WHITE'}
      click={click} />
  )
})

describe('Square', () => {
  it('Basic rendering', () => {
    const renderer = TestRenderer.create(
      <Square value={'WHITE'}/>)
    const result = renderer.toJSON()
    expect(result).toMatchSnapshot()
  })

  it('should render one pawn', () => {
    expect(renderer.find('.pawn')).toHaveLength(1)
  })

  it('should render one pawn with className "white"', () => {
    expect(renderer.find('.white')).toHaveLength(1)
  })

  it('should render one pawn with className "black" on props value={"BLACK"}', () => {
    renderer.setProps({ value: 'BLACK' })
    expect(renderer.find('.black')).toHaveLength(1)
  })

  // it('Should have "black" as a className', () => {
  //   const instance = renderer.root
  //   const element = instance.findByType('div')
  //   expect(element.props.className.includes('black')).toBe(true)
  // })

  // it('Should change "black" className to white on props change', () => {
  //   renderer.update(<Pawn color={'white'}/>)
  //   const instance = renderer.root
  //   const element = instance.findByType('div')
  //   const result = renderer.toJSON()
  //   expect(result).toMatchSnapshot()
  //   expect(element.props.className.includes('white')).toBe(true)
  // })
})
