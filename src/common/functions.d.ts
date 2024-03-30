
declare type Functions = {
  hello: {
    params: {
      name: string
    }
    response: {
      test: string
    }
  }
}

type Handler<F extends keyof Functions> = (
  params: Functions[F]["params"],
) => Promise<Functions[F]["response"]>

declare function DefineFunction<F extends keyof Functions>(
  handler: Handler<F>,
): Handler<F>
