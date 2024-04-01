import React from 'react'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode"

export function Scanner(props: {
  onScan: (barcode: string) => void
}) {
  React.useEffect(() => {
    const html5Qrcode = new Html5Qrcode("barcode_reader", {
      verbose: false,
      formatsToSupport: [
        Html5QrcodeSupportedFormats.EAN_13,
      ]
    })
    let stop = true
    html5Qrcode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        //qrbox: 250,
      },
      (decodedText: string) => {
        stop = false
        html5Qrcode.stop()
        props.onScan(decodedText)
      },
      (errorMessage: string) => {
        console.error(errorMessage)
      }
    )
    return () => {
      if(stop) html5Qrcode.stop()
    }
  }, [])
  return <div
    id="barcode_reader"
    style={{
      width: 350,
      height: 400,
    }}
  />
}
