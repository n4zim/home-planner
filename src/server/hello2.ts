
export async function hello(params: { name: string }) {
  return {
    test: `Hello, ${params.name}!`,
  }
}
