import React from 'react'
import styled from 'styled-components'
import { keyframes } from 'styled-components'
import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from 'react-transition-group'
import { useState, useEffect } from 'react'

const PlayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 7vh);
  grid-template-rows: repeat(3, 7vh);
  grid-gap: 10px;
  background-color: black;
  /* height: 90vh;
  width: 80vw; */
`

const Wrapper = styled.div`
  background-color: grey;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const EmptyCell = styled.div`
  height: 100%;
  width: 100%;
  background-color: beige;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: black;
  font-weight: bold;
  font-size: 4vh;
`

const WhoseTurn = styled.div`
  position: absolute;
  font-size: 20px;
  user-select: none;
  margin-top: ${21 + 5}vh;
`

const Outcome = styled.div`
  position: absolute;
  user-select: none;
  font-size: 20px;
  margin-bottom: ${21 + 15}vh;
`

export const PlayArea = () => {
  const [player, setPlayer] = useState(0)

  const [cell_7, setCell_7] = useState()
  const [cell_8, setCell_8] = useState()
  const [cell_9, setCell_9] = useState()
  const [cell_4, setCell_4] = useState()
  const [cell_5, setCell_5] = useState()
  const [cell_6, setCell_6] = useState()
  const [cell_1, setCell_1] = useState()
  const [cell_2, setCell_2] = useState()
  const [cell_3, setCell_3] = useState()

  const [whoWinner, setWhoWinner] = useState()

  const [gameEnd, setGameEnd] = useState(false)
  const [stopGame, setStopGame] = useState('None')
  const [fadeIn, setFadeIn] = useState(1)

  const Cell7 = styled(EmptyCell)`
    pointer-events: ${() => (cell_7 >= 0 ? 'none' : 'auto')};
  `
  const Cell8 = styled(EmptyCell)`
    pointer-events: ${() => (cell_8 >= 0 ? 'none' : 'auto')};
  `
  const Cell9 = styled(EmptyCell)`
    pointer-events: ${() => (cell_9 >= 0 ? 'none' : 'auto')};
  `
  const Cell4 = styled(EmptyCell)`
    pointer-events: ${() => (cell_4 >= 0 ? 'none' : 'auto')};
  `
  const Cell5 = styled(EmptyCell)`
    pointer-events: ${() => (cell_5 >= 0 ? 'none' : 'auto')};
  `
  const Cell6 = styled(EmptyCell)`
    pointer-events: ${() => (cell_6 >= 0 ? 'none' : 'auto')};
  `
  const Cell1 = styled(EmptyCell)`
    pointer-events: ${() => (cell_1 >= 0 ? 'none' : 'auto')};
  `
  const Cell2 = styled(EmptyCell)`
    pointer-events: ${() => (cell_2 >= 0 ? 'none' : 'auto')};
  `
  const Cell3 = styled(EmptyCell)`
    pointer-events: ${() => (cell_3 >= 0 ? 'none' : 'auto')};
  `

  const ReplayBtn = styled.button`
    position: absolute;
    margin-top: 600px;
    padding: 10px;
    font-size: 20px;
    color: white;
    background-color: green;
    cursor: pointer;
    border-radius: 4px;
    display: ${stopGame};

    &:hover {
      background-color: darkgreen;
    }
  `

  const FreezeGameState = styled.div`
    position: absolute;
    height: 30vh;
    min-width: 30vh;
    width: 15vw;
    background-color: rgba(10, 10, 10, 0.8);
    /* margin-top: 600px; */
    /* display: ${stopGame};
    opacity: ${fadeIn}; */
  `

  const fadeInAnimation = keyframes`
  0% {opacity: 0}
  50% {opacity: 0.5}
  100% {opacity: 0.7}
`

  const FreezeGameStateAnimation = styled(FreezeGameState)`
    transition: 0.5s;
    opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
    display: ${({ state }) => (state === 'exited' ? 'none' : 'block')};
  `

  const updatePlayer = () => {
    player === 0 ? setPlayer(1) : setPlayer(0)
  }

  const makingMoveClick = (cellState, cellMethod) => {
    cellMethod(player)
    cellState === 0 ? cellMethod(1) : cellMethod(0)
    updatePlayer()
  }

  const makingMoveResult = (prop) => {
    if (prop === 0) {
      return 'X'
    } else if (prop === 1) {
      return 'O'
    }
  }

  const turn = () => {
    if (player === 0) {
      return "Player 1's Turn"
    } else if (player === 1) {
      return "Player 2's Turn"
    }
  }

  const winnerConversion = (i) => {
    setStopGame('Block')
    setGameEnd(true)
    if (i === 0) {
      setWhoWinner('Player 2 Winner')
      return 'Player 2 Winner'
    } else if (i === 1) {
      setWhoWinner('Player 1 Winner')
      return 'Player 1 Winner'
    }
  }

  // Freezes game after winner is decided

  // useEffect(() => {
  //   setGameEnd(1)
  // }, [])

  // const freezeGame = () => {
  //   const cells = [cell_1, cell_2, cell_3, cell_4, cell_5, cell_6, cell_7, cell_8, cell_9]

  //   for (let i = 0; i < 10; i++){
  //     if (cells[i] == null){
  //       return (cells[i])
  //     }
  //   }
  // }

  // List of cells

  const row1 = [cell_7, cell_8, cell_9]
  const row2 = [cell_4, cell_5, cell_6]
  const row3 = [cell_1, cell_2, cell_3]
  const col1 = [cell_7, cell_4, cell_1]
  const col2 = [cell_8, cell_5, cell_2]
  const col3 = [cell_9, cell_6, cell_3]
  const cross1 = [cell_7, cell_5, cell_3]
  const cross2 = [cell_9, cell_5, cell_1]
  const allCells = [
    cell_1,
    cell_2,
    cell_3,
    cell_4,
    cell_5,
    cell_6,
    cell_7,
    cell_8,
    cell_9,
  ]

  const checkInt = (arr) => {
    return arr.every(function (element) {
      return typeof element === 'number'
    })
  }

  const checkMatch = (arr) => {
    return new Set(arr).size === 1 && checkInt(arr)
  }

  const winner = () => {
    if (checkMatch(row1)) {
      return winnerConversion(cell_7)
    } else if (checkMatch(row2)) {
      return winnerConversion(cell_4)
    } else if (checkMatch(row3)) {
      return winnerConversion(cell_1)
    } else if (checkMatch(col1)) {
      return winnerConversion(cell_4)
    } else if (checkMatch(col2)) {
      return winnerConversion(cell_5)
    } else if (checkMatch(col3)) {
      return winnerConversion(cell_6)
    } else if (checkMatch(cross1)) {
      return winnerConversion(cell_5)
    } else if (checkMatch(cross2)) {
      return winnerConversion(cell_5)
    } else if (checkInt(allCells)) {
      setFadeIn(1)
      setGameEnd(true)
      setWhoWinner('Draw')
      setStopGame('Block')

      return 'Draw'
    }
  }

  const resetBoard = () => {
    setCell_1(undefined)
    setCell_2(undefined)
    setCell_3(undefined)
    setCell_4(undefined)
    setCell_5(undefined)
    setCell_6(undefined)
    setCell_7(undefined)
    setCell_8(undefined)
    setCell_9(undefined)
    setStopGame('None')
    setWhoWinner(undefined)
    setGameEnd(false)
  }

  useEffect(() => {
    // alert("Use Effect Test")
    winner()
  }, [cell_1, cell_2, cell_3, cell_4, cell_5, cell_6, cell_7, cell_8, cell_9])

  useEffect(() => {})

  return (
    <>
      <Wrapper>
        <PlayGrid>
          <Cell7 onClick={() => makingMoveClick(player, setCell_7)}>
            {makingMoveResult(cell_7)}
          </Cell7>
          <Cell8 onClick={() => makingMoveClick(player, setCell_8)}>
            {makingMoveResult(cell_8)}
          </Cell8>
          <Cell9 onClick={() => makingMoveClick(player, setCell_9)}>
            {makingMoveResult(cell_9)}
          </Cell9>
          <Cell4 onClick={() => makingMoveClick(player, setCell_4)}>
            {makingMoveResult(cell_4)}
          </Cell4>
          <Cell5 onClick={() => makingMoveClick(player, setCell_5)}>
            {makingMoveResult(cell_5)}
          </Cell5>
          <Cell6 onClick={() => makingMoveClick(player, setCell_6)}>
            {makingMoveResult(cell_6)}
          </Cell6>
          <Cell1 onClick={() => makingMoveClick(player, setCell_1)}>
            {makingMoveResult(cell_1)}
          </Cell1>
          <Cell2 onClick={() => makingMoveClick(player, setCell_2)}>
            {makingMoveResult(cell_2)}
          </Cell2>
          <Cell3 onClick={() => makingMoveClick(player, setCell_3)}>
            {makingMoveResult(cell_3)}
          </Cell3>
        </PlayGrid>
        <Transition in={gameEnd} timeout={100}>
          {(state) => (
            <FreezeGameStateAnimation state={state}></FreezeGameStateAnimation>
          )}
        </Transition>

        <WhoseTurn>{turn()}</WhoseTurn>
        <Outcome>{whoWinner}</Outcome>
        <ReplayBtn onClick={() => resetBoard()}>Replay?</ReplayBtn>
      </Wrapper>
    </>
  )
}
