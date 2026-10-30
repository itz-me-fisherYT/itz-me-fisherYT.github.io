import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<html><body style="margin:0;font-family:Arial,sans-serif;background:#070912;color:#f8fafc"><div style="box-sizing:border-box;width:1200px;height:630px;padding:70px 80px;background:radial-gradient(ellipse at 90% 80%,#3e286c90,transparent 65%),linear-gradient(transparent 39px,#ffffff05 40px),linear-gradient(90deg,transparent 39px,#ffffff05 40px);background-size:auto,40px 40px,40px 40px"><div style="font-size:22px;font-weight:bold;letter-spacing:-1px;color:#c7bfff">f. &nbsp; ItzRealFisher.</div><p style="margin:65px 0 15px;font-size:18px;letter-spacing:5px;color:#a9a2ee">DEVELOPER / GAMER / CREATOR</p><h1 style="font-size:104px;line-height:1.06;letter-spacing:-6px;margin:0">Hey, I’m <span style="color:#aaa0ff">Fisher.</span></h1><p style="color:#a8b2cb;font-size:23px;margin:30px 0">Bots, blocks, websites and a little bit of everything.</p><div style="border-top:1px solid #aaa3ff33;display:flex;justify-content:space-between;margin-top:65px;padding-top:24px;color:#a8b2cb;font-size:15px"><span>NORTH QUEENSLAND, AUSTRALIA</span><span style="color:#c4b6ff">itzfisher.org ↗</span></div></div></body></html>`,
  );
  await page.screenshot({
    path: fileURLToPath(
      new URL("../public/images/social-preview.png", import.meta.url),
    ),
  });
} finally {
  await browser.close();
}
