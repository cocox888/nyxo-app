import { resetCoaching } from '@actions/coaching/coaching-actions'
import CoachingMonthCard from '@components/CoachingMonthCard/CoachingMonthCard'
import React, { memo } from 'react'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import {
  getActiveCoachingMonth,
  getCoachingMonths,
  getCoachingStage
} from '@selectors/coaching-selectors/coaching-selectors'
import styled from 'styled-components/native'
import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import TextButton from '@components/Buttons/TextButton'
import {
  Container,
  H2,
  H3,
  P,
  SafeAreaView
} from '@components/Primitives/Primitives'
import { useListCoaching } from 'hooks/coaching/useCoaching'

const CoachingSettings = () => {
  const handleCoachingReset = () => {}

  const { data } = useListCoaching()
  const months = data?.items

  return (
    <SafeAreaView>
      <ScrollView>
        <GoBackContainer>
          <GoBack />
        </GoBackContainer>

        <Container>
          <H2>Coaching settings</H2>

          {/* <P variables={{ coachingStage }}>CoachingResetText</P> */}
          {/* 
          <ResetButton center onPress={handleCoachingReset}>
            Reset coaching
          </ResetButton> */}

          {/* <ActiveContainer>
            {activeMonth && <H3>COACHING_SETTINGS.CURRENTLY_ACTIVE</H3>}
            {activeMonth && <CoachingMonthCard month={activeMonth} />}
          </ActiveContainer> */}

          {/* {coachingMonths && coachingMonths.length > 0 && (
            <H3>COACHING_SETTINGS.OTHER_COACHING_MONTHS</H3>
          )} */}

          {months &&
            months.map((coaching) => (
              <CoachingMonthCard key={`${coaching?.id}`} month={coaching} />
            ))}
        </Container>
      </ScrollView>
    </SafeAreaView>
  )
}

export default memo(CoachingSettings)

const ResetButton = styled(TextButton)`
  margin: 20px;
`

const ActiveContainer = styled.View`
  margin-bottom: 30px;
`
