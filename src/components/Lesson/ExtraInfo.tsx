import { Document } from '@contentful/rich-text-types'
import React, { memo } from 'react'
import styled from 'styled-components/native'
import { H3 } from '../Primitives/Primitives'
import RichText from '../RichText'

interface Props {
  additionalInformation?: Document
}

const ExtraInfo = ({ additionalInformation }: Props) => {
  const correctFormat = typeof additionalInformation === 'object'

  return (
    <>
      {correctFormat && (
        <Container>
          <Title>LESSON_EXTRA_INFORMATION</Title>
          <RichText content={additionalInformation} />
        </Container>
      )}
    </>
  )
}

export default memo(ExtraInfo)

const Container = styled.View`
  margin: 20px 20px 100px;
`

const Title = styled(H3)`
  margin-bottom: 30px;
`
