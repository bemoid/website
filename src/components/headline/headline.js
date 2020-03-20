import { string, node } from 'prop-types'

import { ButtonHollow } from '@src/components'

import * as Styled from './headline.styled'

export const Headline = ({ heading, children }) => {
  return (
    <Styled.Wrapper>
      <Styled.Header>
        <Styled.Heading>{heading}</Styled.Heading>
      </Styled.Header>

      <Styled.Body>
        <Styled.Content>{children}</Styled.Content>
      </Styled.Body>

      <Styled.Aside>
        <ButtonHollow href="https://github.com/bemoid/bemoid/">
          Visit Github
        </ButtonHollow>
      </Styled.Aside>
    </Styled.Wrapper>
  )
}

Headline.propTypes = {
  heading: string.isRequired,
  children: node.isRequired,
}