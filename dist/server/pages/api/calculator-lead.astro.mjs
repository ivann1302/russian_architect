export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  {
    return new Response(JSON.stringify({ error: "Telegram is not configured" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
