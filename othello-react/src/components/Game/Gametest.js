// import React from 'react'
// import TestRenderer from 'react-test-renderer'
// import { configure, mount } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import Game from './Game'
// import { Socket } from 'react-socket-io'

// const uri = 'http://localhost:8080'
// const options = { transports: ['websocket'] }

// configure({ adapter: new Adapter() })

// let renderer
// beforeEach(() => {
//   renderer = mount(
//     <Socket
//       uri={uri}
//       options={options}
//     >
//       <Game />
//     </Socket>
//   )
// })

// describe('Board', () => {
//   it('Basic rendering', () => {
//     const renderer = TestRenderer.create(
//       <Game />
//     )
//     const result = renderer.toJSON()
//     expect(result).toMatchSnapshot()
//   })

//   // it('Doesn\'t change player after an illegal click', () => {
//   //   const instance = renderer.instance()
//   //   instance.handleClick(3, 3)
//   //   expect(renderer.state('isBlack')).toBe(true)
//   // })

//   // it('Changes player after a legal click', () => {
//   //   const instance = renderer.instance()
//   //   instance.handleClick(2, 3)
//   //   expect(renderer.state('isBlack')).toBe(false)
//   // })

//   // it('Changes score after a legal click', () => {
//   //   const instance = renderer.instance()
//   //   instance.handleClick(2, 3)
//   //   expect(renderer.state('score').BLACK).toEqual(4)
//   //   expect(renderer.state('score').WHITE).toEqual(1)
//   // })

//   // it('Changes black pawns number after a legal click', () => {
//   //   const instance = renderer.instance()
//   //   instance.handleClick(2, 3)
//   //   renderer.update()
//   //   expect(renderer.find('.black')).toHaveLength(4)
//   // })
// })
