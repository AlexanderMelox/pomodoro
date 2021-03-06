import { useContext, forwardRef } from 'react'
import styled from 'styled-components/macro'
import { rgba } from 'polished'
import colors from '../style/colors'
import { SettingsContext } from '../contexts/SettingsContext'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { breakpoints } from '../style'

const timers = ['pomodoro', 'shortBreak', 'longBreak']
const timerMap = {
  pomodoro: 'pomodoro',
  shortBreak: 'short break',
  longBreak: 'long break',
}

const Nav = forwardRef(({ selectedTimer, setSelectedTimer }, ref) => {
  const [{ color }] = useContext(SettingsContext)

  return (
    <NavContainer ref={ref}>
      <NavList>
        <AnimateSharedLayout>
          {timers.map((timer) => {
            const active = timer === selectedTimer
            return (
              <NavListItem
                key={timer}
                initial={false}
                $active={active}
                $color={color}
                onClick={() => setSelectedTimer(timer)}
              >
                <span>{timerMap[timer]}</span>
                {active && (
                  <NavListItemBackground
                    layoutId="nav-item-background"
                    initial={false}
                    animate={{ backgroundColor: colors[color] }}
                    $color={color}
                  >
                    {''}
                  </NavListItemBackground>
                )}
              </NavListItem>
            )
          })}
        </AnimateSharedLayout>
      </NavList>
    </NavContainer>
  )
})

export const NavContainer = styled.nav`
  position: relative;
  z-index: 1;
  min-width: 32.7rem;
  height: 6.3rem;
  background-color: ${colors.dark2};
  border-radius: 3.15rem;
  grid-area: navigation;
  padding: 0.8rem 0.6rem;
  margin: 0 auto;
  font-family: var(--selected-font);
`

export const NavList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
`

export const NavListItem = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 1.7rem 2.3rem; */
  font-size: 1.2rem;
  color: ${({ $active }) =>
    $active ? colors.dark1 : rgba(colors.primary4, 0.4)};
  transition: color 0.1s;
  width: 10.52rem;
  height: 4.8rem;
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      color: ${(props) => (props.$active ? colors.dark1 : colors.primary4)};
    }
  }

  span {
    z-index: ${({ $active }) => ($active ? '3' : '-1')};
    display: inline-block;
    position: relative;
    padding-top: 2px;
  }

  ${breakpoints.tablet} {
    font-size: 1.4rem;
    width: 12rem;
  }
`

export const NavListItemBackground = styled(motion.div)`
  position: absolute;
  border-radius: 2.65rem;
  height: 100%;
  width: 100%;

  top: 0;
  left: 0;
  z-index: 2;
`

export default Nav
