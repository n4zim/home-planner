
export type OpenFoodFactData = {
  name: string
  image?: string
  stores: string[]
  quantity?: string
  conservation?: string
  nutriscore?: string
  ecoscore?: string
}

export async function getOpenFoodFactData(barcode: string): Promise<OpenFoodFactData | undefined>{
  let response = await fetch('https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json')
  let data = await response.json()
  if(data?.product) {
    return {
      name: data.product.product_name_fr
        || data.product.product_name
        || data.product.product_name_en,
      image: data.product.image_url,
      stores: data.product.stores_tags || [],
      quantity: data.product.quantity,
      conservation: data.product.conservation_conditions,
      nutriscore: filterScoreData(data.product.nutriscore_grade),
      ecoscore: filterScoreData(data.product.ecoscore_grade),
    }
  }
}

function filterScoreData(input: string): string | undefined {
  if(input === "not-applicable" || input === "unknown") {
    return
  }
  return input.toUpperCase()
}