import { Chip } from '@mui/material'
import { blue, green, orange, pink, yellow } from '@mui/material/colors'
import React from 'react'

type Props = {day : string}

export const DayChip = (props: Props) => {
    const dayColor = () => {
      switch (props.day) {
        case 'MON' : return yellow
        case 'TUE' : return pink
        case 'WED' : return green
        case 'THU' : return orange
        case 'FRI' : return blue
        default : return '#000000'
      }
    }
    
  return (
    <Chip label={props.day} size="small" sx={{
        bgcolor: dayColor()[100],
        color: dayColor()[800],
        mr: 1
    }}/>
  )
}

export default DayChip;