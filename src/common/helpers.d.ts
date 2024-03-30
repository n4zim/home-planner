
declare function CallFunction<F extends keyof Functions>(
  params: Functions[F]["params"],
): Promise<Functions[F]["response"]> {
  return fetch("/api/" + F, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(res => res.json())
}
