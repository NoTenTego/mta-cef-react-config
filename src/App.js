import { Typography, Stack } from "@mui/material"
import React, { useState } from "react"

function App() {
  const [config, setConfig] = useState(null)

  window.clientData = (name, data) => {
    try {

    } catch (error) {
      console.error("Error processing clientData:", error)
    }
  }

  if (!config) {
    return null
  }

  return (
    <>

    </>
  )
}

export default App
