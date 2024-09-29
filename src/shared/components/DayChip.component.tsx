import { Chip } from '@mui/material'
import { blue, green, orange, pink, yellow } from '@mui/material/colors'
import React from 'react'

type Props = {day : string}

const DayChip = (props: Props) => {
    const dayColor = () => {
        if (props.day === 'MON') return yellow
        if (props.day === 'TUE') return pink
        if (props.day === 'WED') return green
        if (props.day === 'THU') return orange
        if (props.day === 'FRI') return blue
        return '#000000' // Default color for other days (Saturday, Sunday)
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