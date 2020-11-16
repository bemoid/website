import { array, string, object, node } from 'prop-types'

import { DocsSingleView } from '@src/views/docs/single'
import { getVersions, getDocs, getAllDocs, getAllDocsByGroup } from '@query'
import {
  DocsContextProvider,
  DocsByGroupContextProvider,
  VersionsContextProvider,
  CurrentVersionContextProvider,
} from '@src/contexts'

export async function getStaticProps ({ params }) {
  const [version, slug] = params.path

  const versions = await getVersions()
  const docs = await getDocs(version, slug)
  const allDocs = await getAllDocs(version, slug)
  const allDocsByGroup = await getAllDocsByGroup(version)

  return {
    props: {
      context: {
        versions,
        currentVersion: version,
        allDocs,
        allDocsByGroup,
      },
      title: docs.attributes.title,
      description: docs.attributes.description,
      shortcodes: docs.attributes.shortcodes,
      headings: docs.attributes.headings,
      body: docs.body,
    }
  }
}

export async function getStaticPaths () {
  let paths = []
  const versions = await getVersions()

  for (const version of versions) {
    const docs = await getAllDocs(version)

    paths = paths.concat(docs.map((item) => ({
      params: {
        path: [version, item.attributes.slug],
      }
    })))
  }

  return { paths, fallback: false }
}

const DocsSingle = ({
  title,
  description,
  shortcodes,
  headings,
  body,
  context,
  children,
}) => {
  return (
    <VersionsContextProvider value={context.versions}>
      <CurrentVersionContextProvider value={context.currentVersion}>
        <DocsByGroupContextProvider value={context.allDocsByGroup}>
          <DocsContextProvider value={context.allDocs}>
            <DocsSingleView
              title={title}
              description={description}
              shortcodes={shortcodes}
              headings={headings}
              body={body}
            >
              {children}
            </DocsSingleView>
          </DocsContextProvider>
        </DocsByGroupContextProvider>
      </CurrentVersionContextProvider>
    </VersionsContextProvider>
  )
}

DocsSingle.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  shortcodes: object,
  headings: array,
  body: string.isRequired,
  context: object.isRequired,
  children: node,
}

export default DocsSingle