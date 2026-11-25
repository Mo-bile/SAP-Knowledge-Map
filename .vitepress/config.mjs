import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-mermaid-viewer'
import { maps } from './maps.mjs'

const config = withMermaid(defineConfig({
  lang: 'ko-KR',
  title: 'SAP Knowledge Map',
  description: 'SAP 개념의 위치, 역할, 연결 관계와 작동 흐름을 탐색하는 지식 지도',
  base: '/SAP-Knowledge-Map/',
  head: [['link', {
    rel: 'icon',
    type: 'image/svg+xml',
    href: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#3451b2"/><text x="32" y="39" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="700" fill="white">SAP</text></svg>')}`
  }]],
  // GitHub Pages serves real .html files without a rewrite server.
  cleanUrls: false,
  srcExclude: ['node_modules/**', 'test-results/**', 'playwright-report/**', '**/AGENTS.md', 'readme.md', 'README.md', 'GUIDELINES.md'],
  // Preserve previously shared URLs while organizing the Markdown sources.
  rewrites: {
    'maps/:page': ':page',
    'mentoring/first-week/:page': 'fisrt week/:page'
  },
  markdown: {
    languages: ['abap'],
    config(md) {
      // Keep Markdown links valid in GitHub/Obsidian, but target the stable web URLs.
      md.core.ruler.after('inline', 'public-content-links', state => {
        for (const block of state.tokens) {
          for (const token of block.children || []) {
            if (token.type !== 'link_open') continue
            const href = token.attrGet('href')
            if (href) token.attrSet('href', href
              .replace(/^\.\/maps\//, './')
              .replace(/^\.\/mentoring\/first-week\//, './fisrt%20week/'))
          }
        }
      })
    }
  },
  mermaid: {
    securityLevel: 'strict',
    startOnLoad: false,
    theme: 'neutral',
    look: 'classic',
    fontFamily: 'Inter, "Noto Sans KR", system-ui, sans-serif',
    flowchart: {
      wrappingWidth: 280,
      curve: 'basis',
      nodeSpacing: 32,
      rankSpacing: 56
    },
    download: false,
    downloadPng: false
  },
  transformPageData(pageData) {
    const learningTitle = {
      'mentoring/first-week/problem.md': '멘토링 1주차 퀴즈',
      'mentoring/first-week/solution.md': '정답 및 해설'
    }[pageData.filePath]
    if (learningTitle) pageData.title = learningTitle
    const map = maps.find(map => map.file === pageData.filePath)
    if (map) {
      pageData.title = map.title
      pageData.description = map.description
      pageData.frontmatter.mapTitle = map.title
      pageData.frontmatter.mapDescription = map.description
      pageData.frontmatter.outline = false
      pageData.frontmatter.aside = false
      pageData.frontmatter.pageClass = 'knowledge-map'
    }
  },
  themeConfig: {
    nav: [{ text: '홈', link: '/' }],
    sidebar: [
      { text: 'Knowledge Maps', items: maps.map((map, index) => ({ text: `${String(index + 1).padStart(2, '0')}. ${map.title}`, link: `/${map.file.replace(/^maps\//, '').replace(/\.md$/, '')}` })) },
      { text: '학습 자료', items: [
        { text: '멘토링 1주차', collapsed: false, items: [
          { text: '퀴즈', link: '/fisrt week/problem' },
          { text: '정답 및 해설', link: '/fisrt week/solution' }
        ] }
      ] }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/Mo-bile/SAP-Knowledge-Map' }],
    docFooter: { prev: '이전 문서', next: '다음 문서' },
    sidebarMenuLabel: '문서 목록',
    outline: { label: '이 페이지에서' },
    darkModeSwitchLabel: '화면 테마',
    lightModeSwitchTitle: '라이트 모드로 전환',
    darkModeSwitchTitle: '다크 모드로 전환',
    returnToTopLabel: '맨 위로'
  }
}))

// The viewer wrapper still prebundles `debug`, which Mermaid 12 no longer uses.
// Omit that obsolete hint instead of installing an unused dependency.
config.vite.optimizeDeps.include = config.vite.optimizeDeps.include.filter(name => name !== 'debug')

export default config
