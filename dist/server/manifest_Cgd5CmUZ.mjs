import 'piccolore';
import { n as decodeKey } from './chunks/astro/server_CeoJ177E.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CROvs3TR.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/ivan/studio/russian_architect/","cacheDir":"file:///home/ivan/studio/russian_architect/node_modules/.astro/","outDir":"file:///home/ivan/studio/russian_architect/dist/","srcDir":"file:///home/ivan/studio/russian_architect/src/","publicDir":"file:///home/ivan/studio/russian_architect/public/","buildClientDir":"file:///home/ivan/studio/russian_architect/dist/client/","buildServerDir":"file:///home/ivan/studio/russian_architect/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/calculator-lead","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/calculator-lead\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"calculator-lead","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/calculator-lead.ts","pathname":"/api/calculator-lead","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CbRujjRX.css"},{"type":"inline","content":".policy-page[data-astro-cid-oyafezwn]{min-height:100svh;padding:calc(var(--header-height) + 72px) 0 88px;background:linear-gradient(180deg,#10282014,#f8f5ef00 360px),var(--color-cream)}.policy[data-astro-cid-oyafezwn]{width:min(100% - 32px,920px);margin-inline:auto;color:var(--color-text)}.policy__label[data-astro-cid-oyafezwn]{margin:0 0 18px;color:var(--color-gold-500);font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.policy[data-astro-cid-oyafezwn] h1[data-astro-cid-oyafezwn]{max-width:780px;margin:0;font-family:var(--font-heading);font-size:clamp(42px,6vw,72px);font-weight:500;line-height:.98}.policy__lead[data-astro-cid-oyafezwn]{max-width:760px;margin:28px 0 48px;color:var(--color-muted);font-size:clamp(17px,2vw,21px);line-height:1.55}.policy[data-astro-cid-oyafezwn] section[data-astro-cid-oyafezwn]{padding:28px 0;border-top:1px solid var(--color-border)}.policy[data-astro-cid-oyafezwn] h2[data-astro-cid-oyafezwn]{margin:0 0 16px;font-family:var(--font-heading);font-size:clamp(28px,3vw,38px);font-weight:500;line-height:1.08}.policy[data-astro-cid-oyafezwn] p[data-astro-cid-oyafezwn],.policy[data-astro-cid-oyafezwn] li[data-astro-cid-oyafezwn]{color:#33403b;font-size:17px;line-height:1.7}.policy[data-astro-cid-oyafezwn] p[data-astro-cid-oyafezwn]{margin:0 0 12px}.policy[data-astro-cid-oyafezwn] ul[data-astro-cid-oyafezwn]{margin:0;padding-left:22px}.policy[data-astro-cid-oyafezwn] li[data-astro-cid-oyafezwn]+li[data-astro-cid-oyafezwn]{margin-top:8px}.policy[data-astro-cid-oyafezwn] a[data-astro-cid-oyafezwn]{color:var(--color-green-900);font-weight:700;text-underline-offset:4px}@media(max-width:760px){.policy-page[data-astro-cid-oyafezwn]{padding:calc(var(--header-height) + 44px) 0 64px}.policy[data-astro-cid-oyafezwn]{width:min(100% - 24px,var(--container))}.policy__lead[data-astro-cid-oyafezwn]{margin-bottom:34px}.policy[data-astro-cid-oyafezwn] section[data-astro-cid-oyafezwn]{padding:24px 0}.policy[data-astro-cid-oyafezwn] p[data-astro-cid-oyafezwn],.policy[data-astro-cid-oyafezwn] li[data-astro-cid-oyafezwn]{font-size:16px}}\n"}],"routeData":{"route":"/politika","isIndex":false,"type":"page","pattern":"^\\/politika\\/?$","segments":[[{"content":"politika","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/politika.astro","pathname":"/politika","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CbRujjRX.css"},{"type":"external","src":"/_astro/index.DpB3n7Ox.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/ivan/studio/russian_architect/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/ivan/studio/russian_architect/src/pages/politika.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/api/calculator-lead@_@ts":"pages/api/calculator-lead.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/politika@_@astro":"pages/politika.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Cgd5CmUZ.mjs","/home/ivan/studio/russian_architect/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DHl9ym9c.mjs","/home/ivan/studio/russian_architect/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","@/components/ContactsSection":"_astro/ContactsSection.BZ8NPmt_.js","@/components/CtaSection":"_astro/CtaSection.BZqWEf6t.js","@/components/CustomCursor":"_astro/CustomCursor.CP-wog13.js","@/components/FloatingSocials":"_astro/FloatingSocials.5dC4w-iV.js","@/components/FounderSection":"_astro/FounderSection.CLsynmlx.js","@/components/Header":"_astro/Header.BAXy7Lhz.js","@/components/Hero":"_astro/Hero.BR3GbXPk.js","@/components/LeadPopup":"_astro/LeadPopup.BSSSYYGC.js","@/components/PortfolioSection":"_astro/PortfolioSection.qwgIyi1K.js","@/components/ReviewsSection":"_astro/ReviewsSection.DKTzsf-n.js","@/components/ServicesSection":"_astro/ServicesSection.qoPuRxXF.js","@/components/StatsSection":"_astro/StatsSection.Bj9sTwcq.js","@astrojs/react/client.js":"_astro/client.nFz3bvDj.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.CbRujjRX.css","/_astro/index.DpB3n7Ox.css","/apple-touch-icon.png","/favicon-32x32.png","/_astro/Button.Beplt-sp.js","/_astro/ContactsSection.BZ8NPmt_.js","/_astro/CtaSection.BZqWEf6t.js","/_astro/CustomCursor.CP-wog13.js","/_astro/FloatingSocials.5dC4w-iV.js","/_astro/FounderSection.CLsynmlx.js","/_astro/Header.BAXy7Lhz.js","/_astro/Hero.BR3GbXPk.js","/_astro/LeadPopup.BSSSYYGC.js","/_astro/PortfolioSection.qwgIyi1K.js","/_astro/ReviewsSection.DKTzsf-n.js","/_astro/ServicesSection.qoPuRxXF.js","/_astro/StatsSection.Bj9sTwcq.js","/_astro/arrow-right.CNXlPqUI.js","/_astro/client.nFz3bvDj.js","/_astro/createLucideIcon.aW_VARo5.js","/_astro/index.95d291e9.BsPONYMV.js","/_astro/index.DBy5LfQW.js","/_astro/index.b9defd66.D4bLSP1h.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/message-circle.Dd8Ncz4c.js","/_astro/siteContent.D8hb9ALS.js","/_astro/useParallaxImage.KdoJ6MCP.js","/_astro/x.dGwkxMby.js","/assets/rrr-interier-edited.jpg","/assets/rrr-interier.jpg","/assets/rrr-logo.png","/assets/hero/hero-bg.png","/assets/meta/icon-512.png","/assets/meta/og-image.jpg","/assets/cta/project-sheet-cropped.webp","/assets/cta/project-sheet-cutout.png","/assets/cta/project-sheet.png","/assets/reference/g24-hero-reference.png","/assets/reviews/review-20260711115917.webp","/assets/reviews/review-20260711115930.webp","/assets/reviews/review-20260711115943.webp","/assets/reviews/review-20260711115953.webp","/assets/reviews/review-20260711120017.webp","/assets/reviews/review-20260711120031.webp","/assets/reviews/review-20260711120114.webp","/assets/portfolio/vk/vk-50-01.png","/assets/portfolio/vk/vk-50-02.png","/assets/portfolio/vk/vk-50-03.png","/assets/portfolio/vk/vk-50-04.png","/assets/portfolio/vk/vk-50-05.png","/assets/portfolio/vk/vk-52-01.png","/assets/portfolio/vk/vk-52-02.png","/assets/portfolio/vk/vk-52-03.png","/assets/portfolio/vk/vk-52-04.png","/assets/portfolio/vk/vk-52-05.png","/assets/portfolio/vk/vk-96-01.png","/assets/portfolio/vk/vk-96-02.png","/assets/portfolio/vk/vk-96-03.png","/assets/portfolio/vk/vk-97-01.png","/assets/portfolio/vk/vk-97-02.png","/assets/portfolio/vk/vk-97-03.png","/assets/portfolio/vk/processed/vk-50-01.jpg","/assets/portfolio/vk/processed/vk-50-02.jpg","/assets/portfolio/vk/processed/vk-50-03.jpg","/assets/portfolio/vk/processed/vk-50-04.jpg","/assets/portfolio/vk/processed/vk-50-05.jpg","/assets/portfolio/vk/processed/vk-52-01.jpg","/assets/portfolio/vk/processed/vk-52-02.jpg","/assets/portfolio/vk/processed/vk-52-03.jpg","/assets/portfolio/vk/processed/vk-52-04.jpg","/assets/portfolio/vk/processed/vk-52-05.jpg","/assets/portfolio/vk/processed/vk-96-01.jpg","/assets/portfolio/vk/processed/vk-96-02.jpg","/assets/portfolio/vk/processed/vk-96-03.jpg","/assets/portfolio/vk/processed/vk-97-01.jpg","/assets/portfolio/vk/processed/vk-97-02.jpg","/assets/portfolio/vk/processed/vk-97-03.jpg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"gxIEcVpdAgGmZwXPwRcL2ZsRmOveFmW3Lld5mIl6nyA=","sessionConfig":{"driver":"fs-lite","options":{"base":"/home/ivan/studio/russian_architect/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
