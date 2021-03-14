export default class RestGatherer {
  
  processJob(job, resultQueue) {
    const r = job.data.data.trim().substring(1, job.data.data.length - 1);
    const service = job.data.service;
    const serviceHeaders = service.config.credentials.headers;
    const headers = {
      "Content-Type": "application/json",
      ...serviceHeaders,
    };
    const timeoutInSeconds = service.cadence.timeout;
    const controller = new AbortController();

    var requestOptions = {
      method: "POST",
      signal: controller.signal,
      headers,
      body: JSON.stringify({
        data: r,
      }),
      redirect: "follow",
    };

    let response = await fetchTimeout(
      service.config.url,
      timeoutInSeconds * 1000,
      requestOptions
    )
      .then(async (response) => response.json())
      .then((response) => response.data)
      .then((response) => response.replace(/\\\\"/g, /\\"/))
      .then((response) => response.replace(/\\n/g, ""))
      .then(async (response) => {
        return xml2js
          .parseStringPromise(response)
          .then(function (result) {
            return result;
          })
          .catch(function (err) {
            console.log(err);
            return undefined;
          });
      })
      .catch((error) => {
        console.log("error", error);
        if (error.name === "AbortError") {
          // fetch aborted either due to timeout or due to user clicking the cancel button
          throw new Error("Cadence Failure");
        } else {
          throw new Error("Network/Parsing Failure");
        }
      });
    //Push to next transformer
    resultQueue.add("push", {
      xMessage: response,
      sendRecord: job.data.sendRecord,
      kafka: job.data.kafka,
    });
  }

  verify() {

  }
}

const fetchTimeout = (url, ms, { signal, ...options } = {}) => {
  const controller = new AbortController();
  const promise = fetch(url, { signal: controller.signal, ...options });
  if (signal) signal.addEventListener("abort", () => controller.abort());
  const timeout = setTimeout(() => controller.abort(), ms);
  return promise.finally(() => clearTimeout(timeout));
};