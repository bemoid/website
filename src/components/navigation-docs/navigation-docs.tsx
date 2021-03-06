import { useContext, forwardRef } from 'react'

import { Navigation, NavigationIcons } from '@/components'
import { IconReference, IconGuide, IconDocumentation } from '@/icons'
import { CurrentVersionContext, DocsByGroupContext } from '@/contexts'

import * as Styled from './navigation-docs.styled'

export const NavigationDocs = forwardRef<HTMLDivElement>(({ ...rest }, ref) => {
  const { docsByGroup } = useContext(DocsByGroupContext)
  const { currentVersion } = useContext(CurrentVersionContext)

  return (
    <Styled.NavigationDocs ref={ref} {...rest}>
      <Styled.Body>
        <NavigationIcons
          items={[
            {
              title: 'Documentation',
              href: `/docs/${currentVersion}`,
              icon: <IconDocumentation />,
            },
            {
              title: 'Guide',
              href: `/guide/${currentVersion}`,
              icon: <IconGuide />,
            },
            {
              title: 'API Reference',
              href: `/reference/${currentVersion}`,
              icon: <IconReference />,
            },
          ]}
        />

        <Navigation
          items={docsByGroup.map((group) => ({
            name: group.name,
            items: group.items.map((item) => ({
              title: item.attributes.title,
              href: `/docs/${currentVersion}/${item.attributes.slug}`,
            })),
          }))}
        />
      </Styled.Body>
    </Styled.NavigationDocs>
  )
})
