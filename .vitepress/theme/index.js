import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { useData } from 'vitepress'
import 'vitepress-mermaid-viewer/style.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    const { frontmatter } = useData()
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => frontmatter.value.mapTitle && h('header', { class: 'map-heading' }, [
        h('h1', frontmatter.value.mapTitle),
        h('p', frontmatter.value.mapDescription),
        h('p', { class: 'map-help' }, '지도를 누르면 전체 화면으로 열립니다. 휠·핀치로 확대하고 드래그로 이동하세요.')
      ]),
      'sidebar-nav-after': () => h('footer', { class: 'site-owner' }, [
        h('span', '© Mo'),
        h('a', { href: 'mailto:mojy476@gmail.com' }, 'mojy476@gmail.com')
      ])
    })
  }
}
