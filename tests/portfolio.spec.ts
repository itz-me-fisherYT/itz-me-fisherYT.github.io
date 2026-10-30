import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.beforeEach(async ({ page }) => {
  await page.route("https://api.github.com/**", (route) =>
    route.fulfill({ status: 403, body: '{"message":"Rate limit"}' }),
  );
  await page.goto("/");
});
test("navigation, filtering, dialogs, archive and social hub", async ({
  page,
  isMobile,
}) => {
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Fisher");
  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.getByRole("navigation")).toBeVisible();
  }
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/#projects$/);
  await page.getByRole("button", { name: "Discord Bot", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page.getByRole("button", { name: "BlockBoss — view details" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("dialog").getByText("Slash and prefix commands"),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "BlockBoss — view details" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "All projects", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(8);
  await page.getByText("The project archive", { exact: true }).click();
  await expect(page.getByText("BoundPVPKoth", { exact: false })).toBeVisible();
  await expect(page.locator("#socials .social-card")).toHaveCount(11);
  await expect(
    page.locator(
      '#socials a[href="https://www.roblox.com/users/8942431123/profile"]',
    ),
  ).toHaveCount(1);
  for (const link of await page.locator('a[target="_blank"]').all()) {
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  const size = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    width: innerWidth,
  }));
  expect(size.scroll).toBeLessThanOrEqual(size.width);
  await expect(page.locator(".repo-card")).toHaveCount(3);
});
test("keyboard menu, reduced motion and accessibility", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toBeFocused();
  }
  const animation = await page
    .locator(".hero-glow")
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(animation).toBe("none");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
test("images, metadata and rendering", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const summary of await page.locator("details summary").all())
    await summary.click();
  const broken = await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs
        .filter(
          (i) =>
            !(i as HTMLImageElement).complete ||
            (i as HTMLImageElement).naturalWidth === 0,
        )
        .map((i) => i.getAttribute("src")),
    );
  expect(broken).toEqual([]);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://itzfisher.org/",
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath("portfolio.png"),
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("GitHub success, caching and offline recovery", async ({ page }) => {
  let requests = 0;
  await page.route("https://api.github.com/**", (route) => {
    requests++;
    return route.fulfill({
      json: [
        {
          id: 1,
          name: "Portfolio",
          description: "Repository test fixture",
          html_url:
            "https://github.com/itz-me-fisherYT/itz-me-fisherYT.github.io",
          language: "TypeScript",
          stargazers_count: 7,
          fork: false,
        },
      ],
    });
  });
  await page.reload();
  await expect(page.locator(".repo-card")).toHaveCount(1);
  await expect(page.locator(".repo-card")).toContainText("☆ 7");
  const requestsBeforeReload = requests;
  await page.reload();
  await expect(
    page.getByText("Cached public GitHub data", { exact: true }),
  ).toBeVisible();
  expect(requests).toBe(requestsBeforeReload);
  await page.evaluate(() => {
    const key = "fisher-repositories-v1-itz-me-fisherYT";
    const cached = JSON.parse(localStorage.getItem(key)!);
    cached.time = 0;
    localStorage.setItem(key, JSON.stringify(cached));
  });
  await page.route("https://api.github.com/**", (route) => route.abort());
  await page.reload();
  await expect(
    page.getByText("Saved GitHub data · live update unavailable", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator(".repo-card")).toHaveCount(1);
});

test("copy username and modal accessibility", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page
    .locator("#contact button")
    .filter({ hasText: "ItzOnlyFisher" })
    .click();
  await expect(
    page.locator('#contact [role="status"]').filter({ hasText: "Copied!" }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "ItzOnlyFisher",
  );
  await page.getByRole("button", { name: "BlockBoss — view details" }).click();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
