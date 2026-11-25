import { test, expect } from '@playwright/test'

const maps = [
  ['01.comprehensive%20map.html', 'Comprehensive Map', 'SAPUI5'],
  ['02.DDIC.html', 'DDIC Map', 'Domain'],
  ['03.ABAP%20program.html', 'ABAP Program Map', 'Internal Table'],
  ['04.Open%20SQL.html', 'Open SQL Map', 'Table Buffer']
]

for (const [url, title, label] of maps) {
  test(`${title}: direct URL renders original graph and viewer controls work`, async ({ page }) => {
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text())
    })
    const response = await page.goto(url)
    expect(response.status()).toBe(200)
    await expect(page).toHaveTitle(new RegExp(title))
    await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible()
    const diagram = page.getByRole('button', { name: 'Open diagram in fullscreen viewer' })
    await expect(diagram.locator('svg')).toBeVisible()
    await expect(diagram).toContainText(label)
    const clippedLabels = await diagram.locator('foreignObject').evaluateAll(nodes => nodes.filter(node => {
      const label = node.querySelector('div')
      return label && label.getBoundingClientRect().height > node.getBoundingClientRect().height + 1
    }).map(node => node.textContent))
    expect(clippedLabels).toEqual([])
    await expect(page.locator('.mermaid--error, vite-error-overlay')).toHaveCount(0)
    await diagram.click()
    const viewer = page.getByRole('dialog', { name: 'Diagram viewer' })
    await expect(viewer).toBeVisible()
    const scale = viewer.getByLabel('Zoom level')
    await expect(scale).toHaveText('100%')
    await viewer.getByRole('button', { name: 'Zoom in', exact: true }).click()
    await expect(scale).toHaveText('125%')
    await viewer.getByRole('button', { name: 'Reset zoom', exact: true }).click()
    await expect(scale).toHaveText('100%')

    // All SVG edges should fit inside the usable viewer at reset.
    const bounds = await viewer.locator('svg').boundingBox()
    const viewport = page.viewportSize()
    expect(bounds.x).toBeGreaterThanOrEqual(0)
    expect(bounds.y).toBeGreaterThanOrEqual(0)
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(viewport.width + 1)
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(viewport.height + 1)
    const controls = await viewer.locator('.mermaid-view-controls').boundingBox()
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(controls.y)
    expect(controls.x).toBeGreaterThanOrEqual(0)
    expect(controls.x + controls.width).toBeLessThanOrEqual(viewport.width)

    await viewer.getByRole('button', { name: 'Close', exact: true }).click()
    await expect(viewer).toHaveCount(0)
    await expect(diagram).toBeFocused()
    expect(errors).toEqual([])
  })
}

test('wheel zoom, pointer drag, reset and responsive fit', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Desktop mouse interactions')
  await page.goto('01.comprehensive%20map.html')
  await page.getByRole('button', { name: 'Open diagram in fullscreen viewer' }).click()
  const viewer = page.getByRole('dialog', { name: 'Diagram viewer' })
  const content = viewer.locator('.mermaid-view-content')
  const svg = viewer.locator('svg')
  const scale = viewer.getByLabel('Zoom level')
  await page.mouse.move(500, 450)
  await page.mouse.wheel(0, -200)
  await expect(scale).toHaveText('115%')
  const before = await svg.boundingBox()
  await page.mouse.move(500, 450)
  await page.mouse.down()
  await page.mouse.move(620, 510, { steps: 5 })
  await page.mouse.up()
  const after = await svg.boundingBox()
  expect(after.x - before.x).toBeCloseTo(120, 0)
  expect(after.y - before.y).toBeCloseTo(60, 0)
  await viewer.getByRole('button', { name: 'Reset zoom' }).click()
  await expect(scale).toHaveText('100%')
  await expect(content).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)')
  await page.setViewportSize({ width: 800, height: 600 })
  const fit = await svg.boundingBox()
  expect(fit.x).toBeGreaterThanOrEqual(0)
  expect(fit.y).toBeGreaterThanOrEqual(0)
  expect(fit.x + fit.width).toBeLessThanOrEqual(801)
  expect(fit.y + fit.height).toBeLessThanOrEqual(601)
  await page.keyboard.press('Escape')
  await expect(viewer).toHaveCount(0)
})

test('touch drag, pinch zoom and landscape fit', async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Chromium mobile touch emulation')
  await page.goto('03.ABAP%20program.html')
  await page.getByRole('button', { name: 'Open diagram in fullscreen viewer' }).tap()
  const viewer = page.getByRole('dialog', { name: 'Diagram viewer' })
  const svg = viewer.locator('svg')
  const scale = viewer.getByLabel('Zoom level')
  const cdp = await context.newCDPSession(page)
  const touch = async (type, points) => cdp.send('Input.dispatchTouchEvent', {
    type, touchPoints: points.map(([x, y, id]) => ({ x, y, id }))
  })
  const before = await svg.boundingBox()
  await touch('touchStart', [[140, 360, 1]])
  await touch('touchMove', [[210, 410, 1]])
  await touch('touchEnd', [])
  await expect.poll(async () => (await svg.boundingBox()).x - before.x).toBeCloseTo(70, 0)
  await expect.poll(async () => (await svg.boundingBox()).y - before.y).toBeCloseTo(50, 0)
  await touch('touchStart', [[130, 360, 1], [230, 360, 2]])
  await touch('touchMove', [[80, 360, 1], [280, 360, 2]])
  await touch('touchEnd', [])
  await expect(scale).toHaveText('200%')
  await viewer.getByRole('button', { name: 'Reset zoom' }).tap()
  await expect(scale).toHaveText('100%')
  await page.setViewportSize({ width: 851, height: 393 })
  const fit = await svg.boundingBox()
  expect(fit.x).toBeGreaterThanOrEqual(0)
  expect(fit.y).toBeGreaterThanOrEqual(0)
  expect(fit.x + fit.width).toBeLessThanOrEqual(852)
  expect(fit.y + fit.height).toBeLessThanOrEqual(394)
  await viewer.getByRole('button', { name: 'Close', exact: true }).tap()
  await expect(viewer).toHaveCount(0)
})

test('home links, sidebar navigation and dark theme keep graphs usable', async ({ page }, testInfo) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => {
    if (message.type() === 'error' || message.type() === 'warning') errors.push(message.text())
  })
  await page.goto('./')
  await expect(page.locator('main')).toContainText('SAP Knowledge Map')
  await page.locator('main').getByRole('link', { name: 'ABAP Program Map', exact: true }).click()
  await expect(page).toHaveURL(/03\.ABAP%20program\.html$/)
  await expect(page.locator('.mermaid svg')).toBeVisible()
  const lightFill = await page.locator('.mermaid svg .node rect').first().evaluate(node => getComputedStyle(node).fill)
  // The browser's color preference is also supported without opening mobile menus.
  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(page.locator('html')).toHaveClass(/dark/)
  await expect.poll(async () => page.locator('.mermaid svg .node rect').first().evaluate(node => getComputedStyle(node).fill)).not.toBe(lightFill)
  for (const [url, , label] of maps) {
    await page.goto(url)
    const diagram = page.locator('.mermaid')
    await expect(diagram.locator('svg')).toBeVisible()
    await expect(diagram).toContainText(label)
    const fills = await diagram.locator('svg .node rect').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).fill))
    expect(fills.length).toBeGreaterThan(0)
    await expect(page.locator('.mermaid--error')).toHaveCount(0)
  }
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await expect(page.locator('.mermaid svg')).toBeVisible()
  if (testInfo.project.name === 'desktop') {
    const sidebar = await page.locator('.VPSidebar').boundingBox()
    expect(sidebar.width).toBeGreaterThanOrEqual(250)
    const document = await page.locator('.content-container').boundingBox()
    expect(document.width).toBeGreaterThan(900)
    // Verify the actual theme switch as well as OS color-scheme changes.
    await page.locator('.VPNavBarAppearance').getByRole('switch').click()
    await expect(page.locator('html')).toHaveClass(/dark/)
    await expect.poll(async () => page.locator('.mermaid svg .node rect').first().evaluate(node => getComputedStyle(node).fill)).not.toBe(lightFill)
    await page.locator('.VPSidebar').getByRole('link', { name: 'DDIC Map', exact: true }).click()
    await expect(page).toHaveURL(/02\.DDIC\.html$/)
    await expect(page.locator('.mermaid svg')).toBeVisible()
  }
  expect(errors).toEqual([])
})
