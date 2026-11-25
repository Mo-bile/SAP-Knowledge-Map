import { test, expect } from '@playwright/test'
import { existsSync, readFileSync } from 'node:fs'

test('README and guidelines are excluded from the public site', async ({ request }) => {
  for (const path of ['GUIDELINES.html', 'readme.html', 'README.html', 'GUIDELINES.md', 'readme.md']) {
    const response = await request.get(path)
    expect(response.status(), path).toBe(404)
  }
  const routes = Object.keys(JSON.parse(readFileSync('.vitepress/dist/hashmap.json', 'utf8')))
  expect(routes).toHaveLength(7) // Home, four maps, quiz and answers.
  expect(routes.filter(route => /readme|guidelines/i.test(route))).toEqual([])
  expect(existsSync('.vitepress/dist/GUIDELINES.html')).toBe(false)
})

test('home introduces four maps and exposes only the six learning pages', async ({ page }) => {
  await page.goto('./')
  const main = page.locator('main')
  for (const title of ['Comprehensive Map', 'DDIC Map', 'ABAP Program Map', 'Open SQL Map', '퀴즈', '정답 및 해설']) {
    await expect(main.getByRole('link', { name: title, exact: true })).toBeVisible()
  }
  await expect(main).not.toContainText('로컬 실행')
  await expect(main).not.toContainText('GUIDELINES')
  const links = page.locator('.VPSidebar .VPSidebarItem a[href]')
  await expect(links).toHaveCount(6)
  await expect(links).toHaveText(['01. Comprehensive Map', '02. DDIC Map', '03. ABAP Program Map', '04. Open SQL Map', '퀴즈', '정답 및 해설'])
  const mentoring = page.locator('.VPSidebar .VPSidebarItem.level-1').filter({ hasText: '멘토링 1주차' })
  await expect(mentoring).toHaveCount(1)
  await expect(mentoring.locator('a[href]')).toHaveText(['퀴즈', '정답 및 해설'])
  await expect(page.locator('.VPSidebar')).not.toContainText('작성 원칙')
  await main.getByRole('link', { name: '퀴즈', exact: true }).click()
  await expect(page).toHaveURL(/fisrt%20week\/problem\.html$/)
  await expect(page.locator('main')).toContainText('문제')
  await page.locator('.VPDocFooter').getByRole('link', { name: /정답 및 해설/ }).click()
  await expect(page).toHaveURL(/fisrt%20week\/solution\.html$/)
  await expect(page.locator('main')).toContainText('해설')
})
