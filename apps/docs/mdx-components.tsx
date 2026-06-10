import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import type { Folder } from 'nextra'
import * as Card from '@/components/card'
import * as CodeGroup from '@/components/code-group'
import * as CodeBlock from '@/components/code-block'
import * as Color from '@/components/color'
import * as Columns from '@/components/columns'
import * as Expandable from '@/components/expandable'
import * as Frame from '@/components/frame'
import * as Icon from '@/components/icon'
import * as Steps from '@/components/steps'
import * as Tile from '@/components/tile'
import * as Tooltip from '@/components/tooltip'
import * as Tree from '@/components/tree'

const docsComponents = getThemeComponents()

const clean = (mod: any) =>
  Object.fromEntries(
    Object.entries(mod).filter(
      ([key, value]) => key !== "__esModule" && key !== "default" && value !== undefined
    )
  )

export const useMDXComponents = (components: any) => ({
  ...docsComponents,
  ...components,
  ...clean(Card), 
  ...clean(CodeGroup),
  ...clean(CodeBlock),
  ...clean(Color),
  ...clean(Columns),
  ...clean(Expandable),
  ...clean(Frame),
  ...clean(Icon),
  ...clean(Steps),
  ...clean(Tile),
  ...clean(Tooltip),
  ...clean(Tree)
})
