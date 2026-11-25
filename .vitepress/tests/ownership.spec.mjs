import { test, expect } from '@playwright/test'

test('author and contact appear at the sidebar bottom on home and map pages', async ({ page }, testInfo) => {
  await page.goto('./')
  const mobile = testInfo.project.name === 'mobile'
  if (mobile) await page.getByRole('button', { name: '문서 목록', exact: true }).click()
  const sidebar = page.locator('.VPSidebar')
  const footer = sidebar.locator('footer.site-owner')
  expect(await footer.count()).toBe(1)
  await expect(footer).toBeVisible()
  await expect(footer).toContainText('Mo')
  await expect(footer.getByRole('link', { name: 'mojy476@gmail.com', exact: true })).toHaveAttribute('href', 'mailto:mojy476@gmail.com')
  const bounds = await footer.boundingBox()
  const sidebarBounds = await sidebar.boundingBox()
  expect(bounds.x).toBeGreaterThanOrEqual(sidebarBounds.x)
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(sidebarBounds.x + sidebarBounds.width)
  expect(sidebarBounds.y + sidebarBounds.height - bounds.y - bounds.height).toBeLessThanOrEqual(40)
  await sidebar.getByRole('link', { name: '02. DDIC Map', exact: true }).click()
  await expect(page.locator('.mermaid svg')).toBeVisible()
  if (mobile) await page.getByRole('button', { name: '문서 목록', exact: true }).click()
  await expect(footer).toBeVisible()
  await expect(footer.getByRole('link', { name: 'mojy476@gmail.com', exact: true })).toBeVisible()
})
