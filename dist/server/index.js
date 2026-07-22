const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/") url.pathname = "/index.html";

    const response = await env.ASSETS.fetch(new Request(url, request));
    if (!response.ok) return response;

    const extension = url.pathname.match(/\.[^.\/]+$/)?.[0].toLowerCase();
    const contentType = extension && contentTypes[extension];
    if (!contentType) return response;

    const headers = new Headers(response.headers);
    headers.set("content-type", contentType);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
