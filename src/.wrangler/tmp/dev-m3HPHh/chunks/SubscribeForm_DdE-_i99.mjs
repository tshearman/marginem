globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate } from './astro/server_BqNpRBsA.mjs';
/* empty css                          */

const $$Astro = createAstro("https://marginem.io");
const $$SubscribeForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SubscribeForm;
  const {
    action = "/api/subscribe",
    method = "post",
    idBase = "subscribe"
  } = Astro2.props;
  const emailId = `${idBase}-email`;
  const nameId = `${idBase}-name`;
  return renderTemplate`${maybeRenderHead()}<form class="subscribe-form"${addAttribute(action, "action")}${addAttribute(method, "method")} data-astro-cid-ogjhcnvc> <div class="subscribe-form__field" data-astro-cid-ogjhcnvc> <label${addAttribute(emailId, "for")} data-astro-cid-ogjhcnvc>Email</label> <input${addAttribute(emailId, "id")} name="email" type="email" autocomplete="email" inputmode="email" required placeholder="you@example.com" data-astro-cid-ogjhcnvc> </div> <div class="subscribe-form__field" data-astro-cid-ogjhcnvc> <label${addAttribute(nameId, "for")} data-astro-cid-ogjhcnvc>What should I call you?</label> <input${addAttribute(nameId, "id")} name="name" type="text" autocomplete="name" placeholder="Optional" data-astro-cid-ogjhcnvc> </div> <button type="submit" data-astro-cid-ogjhcnvc>Subscribe</button> <p class="subscribe-form__note" data-astro-cid-ogjhcnvc>
Occasional updates, no spam. Unsubscribe anytime.
</p> </form> `;
}, "/Users/toby/projects/blogupdate/src/components/SubscribeForm.astro", void 0);

export { $$SubscribeForm as $ };
