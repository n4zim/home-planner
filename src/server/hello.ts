
export default DefineFunction<"hello">(async (params) => {
  return {
    test: `Hello, ${params.name}!`,
  }
})
