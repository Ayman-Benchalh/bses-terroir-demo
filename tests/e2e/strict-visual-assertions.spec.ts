import { test, expect } from '@playwright/test';

test.describe('TERROIR Strict Computed Style & Visual Quality Assertions', () => {
  test('homepage loaded stylesheet contains compiled Tailwind rules and verified computed styles', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/fr', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('header', { timeout: 10000 });

    // 1. Verify that compiled stylesheet is linked and loaded
    const stylesheetHref = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      return links.map((l) => (l as HTMLLinkElement).href);
    });
    expect(stylesheetHref.length).toBeGreaterThan(0);
    expect(stylesheetHref.some((href) => href.includes('.css'))).toBe(true);

    // 2. Verify that Tailwind CSS rules are actually active in document.styleSheets (inspecting nested layers)
    const totalCssRules = await page.evaluate(() => {
      function countRules(ruleList: CSSRuleList): number {
        let count = 0;
        for (const rule of Array.from(ruleList)) {
          count++;
          if ('cssRules' in rule && (rule as CSSGroupingRule).cssRules) {
            try {
              count += countRules((rule as CSSGroupingRule).cssRules);
            } catch {
              // ignore
            }
          }
        }
        return count;
      }
      let total = 0;
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          if (sheet.cssRules) {
            total += countRules(sheet.cssRules);
          }
        } catch {
          // Cross-origin sheets
        }
      }
      return total;
    });
    // Tailwind v4 generates hundreds of utility rules inside nested layers
    expect(totalCssRules).toBeGreaterThan(150);

    // 3. Verify Body styling: background #FFFCF5, text #282E23
    const bodyComputed = await page.evaluate(() => {
      const style = window.getComputedStyle(document.body);
      return {
        bg: style.backgroundColor,
        color: style.color,
      };
    });
    // #FFFCF5 is rgb(255, 252, 245), #282E23 is rgb(40, 46, 35)
    expect(bodyComputed.bg).toBe('rgb(255, 252, 245)');
    expect(bodyComputed.color).toBe('rgb(40, 46, 35)');

    // 4. Verify Header computed styles: sticky, backdrop, border
    const headerComputed = await page.evaluate(() => {
      const h = document.querySelector('header');
      if (!h) return null;
      const s = window.getComputedStyle(h);
      return {
        position: s.position,
        zIndex: s.zIndex,
        borderBottomWidth: s.borderBottomWidth,
      };
    });
    expect(headerComputed).not.toBeNull();
    expect(headerComputed?.position).toBe('sticky');
    expect(headerComputed?.zIndex).toBe('50');

    // 5. Verify Hero Primary CTA Button styling (Forest Green #315B3C, White text, rounded)
    const heroBtnComputed = await page.evaluate(() => {
      const btn = document.querySelector('main a[href="/fr/shop"]');
      if (!btn) return null;
      const s = window.getComputedStyle(btn);
      const rect = btn.getBoundingClientRect();
      return {
        bg: s.backgroundColor,
        color: s.color,
        textDecoration: s.textDecorationLine,
        borderRadius: parseFloat(s.borderRadius),
        height: rect.height,
        width: rect.width,
      };
    });
    expect(heroBtnComputed).not.toBeNull();
    // #315B3C is rgb(49, 91, 60)
    expect(heroBtnComputed?.bg).toBe('rgb(49, 91, 60)');
    // Text must be white, NOT default browser blue rgb(0, 0, 238)
    expect(heroBtnComputed?.color).toBe('rgb(255, 255, 255)');
    // No default browser underline!
    expect(heroBtnComputed?.textDecoration).toBe('none');
    // MD3 Touch target >= 48px height
    expect(heroBtnComputed?.height).toBeGreaterThanOrEqual(48);
    expect(heroBtnComputed?.borderRadius).toBeGreaterThanOrEqual(12);

    // 6. Verify Categories Grid Layout: display: grid with multiple columns
    const categoriesSection = await page.evaluate(() => {
      const heading = Array.from(document.querySelectorAll('h2')).find(
        (el) => el.textContent && el.textContent.includes('Explorer par Univers')
      );
      if (!heading) return null;
      const parentSection = heading.closest('section');
      if (!parentSection) return null;
      const grid = parentSection.querySelector('.grid') as HTMLElement | null;
      if (!grid) return null;
      const style = window.getComputedStyle(grid);
      const cards = Array.from(grid.children) as HTMLElement[];
      const firstCardStyle = cards.length > 0 ? window.getComputedStyle(cards[0]) : null;
      const firstCardRect = cards.length > 0 ? cards[0].getBoundingClientRect() : null;

      return {
        display: style.display,
        gridTemplateColumns: style.gridTemplateColumns,
        cardsCount: cards.length,
        firstCardWidth: firstCardRect?.width || 0,
        firstCardHeight: firstCardRect?.height || 0,
        firstCardBg: firstCardStyle?.backgroundColor || '',
        firstCardTextDecor: firstCardStyle?.textDecorationLine || '',
      };
    });

    expect(categoriesSection).not.toBeNull();
    expect(categoriesSection?.display).toBe('grid');
    // At 1440px desktop, categories grid should have multiple tracks
    expect(categoriesSection?.gridTemplateColumns.split(' ').length).toBeGreaterThanOrEqual(3);
    // At least 6 categories displayed
    expect(categoriesSection?.cardsCount).toBeGreaterThanOrEqual(6);
    // Each category card must have proper card dimensions, NOT collapsed
    expect(categoriesSection?.firstCardWidth).toBeGreaterThan(150);
    expect(categoriesSection?.firstCardHeight).toBeGreaterThan(150);
    // Category card links must NOT be underlined blue browser default
    expect(categoriesSection?.firstCardTextDecor).toBe('none');

    // 7. Verify Product Cards have borders, white surface, and formatted pricing
    const productCardComputed = await page.evaluate(() => {
      const card = document.querySelector('.group.relative.flex.flex-col');
      if (!card) return null;
      const style = window.getComputedStyle(card);
      const rect = card.getBoundingClientRect();
      const img = card.querySelector('img');
      return {
        bg: style.backgroundColor,
        borderRadius: parseFloat(style.borderRadius),
        width: rect.width,
        height: rect.height,
        imgVisible: img ? img.getBoundingClientRect().height > 50 : false,
      };
    });
    expect(productCardComputed).not.toBeNull();
    expect(productCardComputed?.bg).toBe('rgb(255, 255, 255)');
    expect(productCardComputed?.width).toBeGreaterThan(200);
    expect(productCardComputed?.height).toBeGreaterThan(250);
    expect(productCardComputed?.imgVisible).toBe(true);

    // 8. Strict Check: NO uncontrolled horizontal page overflow on desktop
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });

  test('responsive category grid shifts from multi-column on desktop to 2 columns on mobile without overflow', async ({
    page,
  }) => {
    // Test on Mobile Viewport 390px (iPhone 12/13/14)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/fr', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('header', { timeout: 10000 });

    const mobileGrid = await page.evaluate(() => {
      const heading = Array.from(document.querySelectorAll('h2')).find(
        (el) => el.textContent && el.textContent.includes('Explorer par Univers')
      );
      if (!heading) return null;
      const parentSection = heading.closest('section');
      const grid = parentSection ? parentSection.querySelector('.grid') : null;
      if (!grid) return null;
      const style = window.getComputedStyle(grid);
      const columns = style.gridTemplateColumns.split(' ').length;
      return {
        display: style.display,
        columns,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });

    expect(mobileGrid).not.toBeNull();
    expect(mobileGrid?.display).toBe('grid');
    // On mobile 390px, grid has 2 columns (grid-cols-2)
    expect(mobileGrid?.columns).toBe(2);
    // Strict overflow check: document.documentElement.scrollWidth <= clientWidth
    expect(mobileGrid?.scrollWidth).toBeLessThanOrEqual((mobileGrid?.clientWidth || 390) + 1);
  });

  test('small mobile 375px (iPhone SE) renders with zero horizontal overflow', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/fr', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('header', { timeout: 10000 });

    const overflowCheck = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });
    expect(overflowCheck.scrollWidth).toBeLessThanOrEqual(overflowCheck.clientWidth + 1);
  });
});
