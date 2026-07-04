import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import expressiveCode from 'astro-expressive-code'
import { expressiveCodeOptions } from './src/site.config'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
	site: 'https://gauryash.github.io',
	integrations: [
		expressiveCode(expressiveCodeOptions),
		tailwind({
			applyBaseStyles: false
		}),
		mdx(),
		icon()
	],
	markdown: {
		processor: unified({
			remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
			rehypePlugins: [
				[
					rehypeExternalLinks,
					{
						target: '_blank',
						rel: ['nofollow, noopener, noreferrer']
					}
				]
			],
			remarkRehype: {
				footnoteLabelProperties: {
					className: ['']
				}
			}
		})
	},
	prefetch: true,
	output: 'static'
})
