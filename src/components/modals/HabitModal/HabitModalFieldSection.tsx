import React, { FC, memo } from 'react'
import styled from 'styled-components/native'
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import translate from '@config/i18n'
import { TextLengthIndicator } from '../../TextIndicator/TextLengthIndicator'
import TranslatedText from '../../TranslatedText'

type Props = {
  indicatorText: string
  inputMaxLength: number
  value: string
  handleChangeText: (v: string) => void
  placeholder: string
  isTitle: boolean
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
}

const HabitModalFieldSection: FC<Props> = ({
  indicatorText,
  isTitle,
  handleChangeText,
  placeholder,
  value,
  inputMaxLength,
  onBlur
}) => {
  const percentage = value.length / inputMaxLength
  return (
    <FieldContainer>
      <FieldIndicatorRow>
        <FieldIndicatorText>{indicatorText}</FieldIndicatorText>
        <TextLengthIndicator radius={45} percentage={percentage} />
      </FieldIndicatorRow>

      <InputField
        maxLength={inputMaxLength}
        multiline
        numberOfLines={isTitle ? 3 : 10}
        value={value}
        onBlur={onBlur}
        onChangeText={handleChangeText}
        placeholder={translate(placeholder)}
        blurOnSubmit={!!isTitle}
        returnKeyType={isTitle ? 'done' : 'default'}
      />
    </FieldContainer>
  )
}

export default memo(HabitModalFieldSection)

const FieldContainer = styled.View`
  flex-direction: column;
  padding: 0px 20px;
  margin-top: 30px;
`

const FieldIndicatorRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const FieldIndicatorText = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.bold};
  font-size: 15px;
  color: ${({ theme }) => theme.textSecondary};
`

const InputField = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.textSecondary
}))`
  margin-top: 10px;
  font-family: ${({ theme }) => theme.medium};
  font-size: 18px;
  color: ${({ theme }) => theme.textPrimary};
  max-height: ${18 * 10}px;
  text-align-vertical: top;
`
