import React from 'react'
import { Section } from './sections'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode"
import { OpenFoodFactData, getOpenFoodFactData } from './data'

export function Scan(props: {
  goToSection: (section: Section) => void
}) {
  const [data, setData] = React.useState<OpenFoodFactData | undefined>()
  React.useEffect(() => {
    //if(data) return
    const html5Qrcode = new Html5Qrcode("barcode_reader", {
      verbose: false,
      formatsToSupport: [
        Html5QrcodeSupportedFormats.EAN_13,
      ]
    })
    html5Qrcode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        //qrbox: 250,
      },
      (decodedText: string) => {
        html5Qrcode.stop()
        getOpenFoodFactData(decodedText).then(setData)
      },
      (errorMessage: string) => {
        console.error(errorMessage)
      }
    )
    return () => {
      html5Qrcode.stop()
    }
  }, [/*data*/])
  return <>
    <button onClick={() => props.goToSection(Section.Home)}>
      Back
    </button>

    {data && <button onClick={() => setData(undefined)}>
      Scan another product
    </button>}

    <div style={{ flex: 1 }}>
      {(data && <div style={{ maxWidth: 500 }}>
        <h2>{data.name}</h2>
        {data.image && <img src={data.image} alt={data.name} />}
        {data.quantity && <p>Quantity: {data.quantity}</p>}
        {data.nutriscore && <p>Nutriscore: {data.nutriscore}</p>}
        {data.ecoscore && <p>Ecoscore: {data.ecoscore}</p>}
        {data.conservation && <p>Conservation: {data.conservation}</p>}
        {data.stores.length !== 0 && <p>Stores: {data.stores.join(", ")}</p>}
      </div>) || (
        <div
          id="barcode_reader"
          style={{
            width: 800,
            height: 1000,
          }}
        />
      )}
    </div>
  </>
}
