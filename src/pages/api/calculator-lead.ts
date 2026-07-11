import type { APIRoute } from "astro";

type LeadPayload = {
  projectType?: string;
  repairType?: string;
  roomCount?: string;
  area?: number;
  estimate?: number;
  name?: string;
  contact?: string;
  contactMethod?: string;
  comment?: string;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const formatRub = (value?: number) => (typeof value === "number" ? new Intl.NumberFormat("ru-RU").format(value) : "не рассчитано");

export const POST: APIRoute = async ({ request }) => {
  const token = import.meta.env.TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return new Response(JSON.stringify({ error: "Telegram is not configured" }), { status: 500 });
  }

  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  if (!payload.name || !payload.contact) {
    return new Response(JSON.stringify({ error: "Name and contact are required" }), { status: 400 });
  }

  const message = [
    "<b>Новая заявка с калькулятора</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(payload.name)}`,
    `<b>Способ связи:</b> ${escapeHtml(payload.contactMethod ?? "не указан")}`,
    `<b>Контакт:</b> ${escapeHtml(payload.contact)}`,
    `<b>Объект:</b> ${escapeHtml(payload.projectType ?? "не указан")}`,
    `<b>Работы:</b> ${escapeHtml(payload.repairType ?? "не указаны")}`,
    `<b>Комнат:</b> ${escapeHtml(payload.roomCount ?? "не указано")}`,
    `<b>Площадь:</b> ${payload.area ?? "не указана"} м²`,
    `<b>Ориентир:</b> от ${formatRub(payload.estimate)} ₽`,
    payload.comment ? `\n<b>Комментарий:</b>\n${escapeHtml(payload.comment)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!telegramResponse.ok) {
    return new Response(JSON.stringify({ error: "Telegram request failed" }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
