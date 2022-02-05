import { useTheme } from '@emotion/react'
import { Autorenew, Pause, PlayArrow } from '@mui/icons-material'
import { Box, Container, Grid, IconButton, Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Donut } from 'react-dial-knob'

const SmartClock = () => {
  const theme = useTheme()
  console.log(theme)

  const [sessionLength, setSessionLength] = useState(600)


  const timeLeft = useMemo(() => dayjs(sessionLength * 1000).format('mm:ss'), [sessionLength])

  return (
    <Grid
      container
      width='100vw'
      height='100vh' 
      sx={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <Container maxWidth='sm'>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} container sx={{ justifyContent: 'center' }}>
            <IconButton>
              {false ? <Pause fontSize='large' /> : <PlayArrow fontSize='large' />}
            </IconButton>
            <IconButton>
              <Autorenew fontSize='large'/>
            </IconButton>
          </Grid>
        </Grid>

        <Grid container alignItems="stretch">
          <Grid item xs component={Paper} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 4 }}>
            <Paper>
              <Typography variant='h6' align='center'>Session 1</Typography>
              <Typography
                variant='h4'
                align='center'
                // sx={{ color: second > 60 ? 'inherit' : red[600] }}
              >
                {timeLeft}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs='auto'>
            <Donut
              diameter={60}
              min={0}
              max={60}
              step={1}
              theme={{
                donutColor: (theme as any).palette.primary.main,
                donutThickness: 10,
                centerColor: '#121212',
                centerFocusedColor: '#121212'
              }}
              value={sessionLength}
              onValueChange={setSessionLength}
            >
              <label>Session</label>
            </Donut>

            <Donut
              diameter={60}
              min={0}
              max={60}
              step={1}
              theme={{
                donutColor: (theme as any).palette.primary.main,
                donutThickness: 10,
                centerColor: '#121212',
                centerFocusedColor: '#121212'
              }}
              value={sessionLength}
              onValueChange={setSessionLength}
            >
              <label>Session</label>
            </Donut>

            <Donut
              diameter={60}
              min={0}
              max={60}
              step={1}
              theme={{
                donutColor: (theme as any).palette.primary.main,
                donutThickness: 10,
                centerColor: '#121212',
                centerFocusedColor: '#121212'
              }}
              value={sessionLength}
              onValueChange={setSessionLength}
            >
              <label>Session</label>
            </Donut>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default SmartClock
