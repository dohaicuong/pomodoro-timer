import { ArrowDownward, ArrowUpward, Autorenew, Pause, PlayArrow } from '@mui/icons-material'
import { Box, Container, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useInterval } from 'usehooks-ts'
import { red } from '@mui/material/colors'
import useSound from 'use-sound'
import beepSound from './beep.wav'

const DefaultClock = () => {
  const [currentSet, setCurrentSet] = useState(0)
  const [numberOfSet, handleSetsInc, handleSetsDesc] = useNumberControl(3, { min: 0 })

  const [type, setType] = useState<'break' | 'session'>('session')
  const [sessionLength, handleSessionIncrease, handleSessionDecrease, setSessionLength] = useNumberControl(25, { max: 60, min: 0 })
  const [breakLength, handleBreakIncrease, handleBreakDecrease] = useNumberControl(5, { max: 60, min: 0 })

  const [play] = useSound(beepSound)
  const [currentSessionSecond, playing, toggleStartPause, handleReset] = useSet(
    type === 'session' ? sessionLength : breakLength,
    () => {
      if (currentSet >= numberOfSet - 1) {
        handleReset('session')
        setCurrentSet(0)
        return
      }

      if (type === 'break') setCurrentSet(pre => pre + 1)

      const toType = type === 'session' ? 'break' : 'session'

      setType(toType)
      handleReset(toType)
      toggleStartPause()
      play()
    },
    type => setType(type || 'session' as any)
  )

  return (
    <Grid
      container
      width='100vw'
      height='100vh' 
      sx={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <Container maxWidth='sm'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h4' align='center'>
              The Clock
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <SetTimeInput
              label='Break Length'
              value={breakLength}
              onIncrease={handleBreakIncrease}
              onDecrease={handleBreakDecrease}
              disabled={playing}
            />
          </Grid>
          <Grid item xs={4}>
            <SetTimeInput
              label='Sets'
              value={numberOfSet}
              onIncrease={handleSetsInc}
              onDecrease={handleSetsDesc}
              disabled={playing}
            />
          </Grid>
          <Grid item xs={4}>
            <SetTimeInput
              label='Session Length'
              value={sessionLength}
              onIncrease={handleSessionIncrease}
              onDecrease={handleSessionDecrease}
              disabled={playing}
            />
          </Grid>
          
          <Grid item xs={12} container sx={{ justifyContent: 'center' }}>
            <ClockFace label={`${type} ${currentSet + 1}`} second={currentSessionSecond} />
          </Grid>

          <Grid item xs={12} container sx={{ justifyContent: 'center' }}>
            <IconButton onClick={toggleStartPause}>
              {playing ? <Pause fontSize='large' /> : <PlayArrow fontSize='large' />}
            </IconButton>
            <IconButton onClick={() => handleReset()}>
              <Autorenew fontSize='large'/>
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default DefaultClock

type UseNumberControlPayload = [
  number,
  () => void,
  () => void,
  (number: number) => void,
]
const useNumberControl = (defaultValue: number, { max, min }: { max?: number, min?: number }): UseNumberControlPayload => {
  const [value, setValue] = useState(defaultValue)
  const handleIncrease = () => {
    if (!Number.isNaN(max) && value >= max!) return
    
    setValue(current => current + 1)
  }
  const handleDecrease = () => {
    if (!Number.isNaN(min) && value <= min!) return

    setValue(current => current - 1)
  }

  return [value, handleIncrease, handleDecrease, setValue]
}

const useSet = (
  sessionLength: number,
  onDone: () => void,
  onReset: (type?: string) => void
): [number, boolean, () => void, (type?: string) => void] => {
  const [playing, setPlaying] = useState(false)
  const [currentSessionSecond, setCurrentSessionSecond] = useState(sessionLength * 60)

  useEffect(() => setCurrentSessionSecond(sessionLength * 60), [sessionLength])

  useInterval(
    () => {
      if (currentSessionSecond === 0) {
        setPlaying(false)
        onDone()
        return
      }
      setCurrentSessionSecond(current => current - 1)
    },
    playing ? 1000 : null,
  )

  const toggle = () => setPlaying(current => !current)

  const reset = (type?: string) => {
    setPlaying(false)
    setCurrentSessionSecond(sessionLength * 60)
    onReset(type)
  }

  return [currentSessionSecond, playing, toggle, reset]
}

type SetTimeInputProps = {
  label: string
  value: number
  onIncrease: () => void
  onDecrease: () => void
  disabled?: boolean
}
const SetTimeInput: React.FC<SetTimeInputProps> = ({ label, value, onIncrease, onDecrease, disabled = false }) => (
  <>
    <Typography variant='h5' align='center' id='session-label'>
      {label}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <IconButton
        onClick={onIncrease}
        disabled={disabled}
        sx={{ marginRight: 1 }}
      >
        <ArrowUpward />
      </IconButton>
      <Typography variant='h6' id='session-length'>
        {value}
      </Typography>
      <IconButton
        onClick={onDecrease}
        disabled={disabled}
        sx={{ marginLeft: 1 }}
      >
        <ArrowDownward />
      </IconButton>
    </Box>
  </>
)

type ClockFaceProps = {
  label: string
  second: number
}
const ClockFace: React.FC<ClockFaceProps> = ({ label, second }) => {
  const timeLeft = useMemo(() => dayjs(second * 1000).format('mm:ss'), [second])
  const capitalizedLabel = useMemo(() => capitalize(label), [label])

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant='h6' align='center'>{capitalizedLabel}</Typography>
      <Typography
        variant='h4'
        align='center'
        sx={{ color: second > 60 ? 'inherit' : red[600] }}
      >
        {timeLeft}
      </Typography>
    </Paper>
  )
}

const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`
