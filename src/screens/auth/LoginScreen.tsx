import ROUTE from '@config/routes/Routes'
import { useAppDispatch } from '@hooks/redux'
import { CompositeNavigationProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { login } from '@reducers/auth'
import { RootStackParamList } from '@typings/navigation/navigation'
import LoginView from '@views/LoginView'
import React, { FC, memo } from 'react'

type RegisterScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList[ROUTE.AUTH], ROUTE.REGISTER>,
  StackNavigationProp<RootStackParamList>
>

type Props = {
  navigation: RegisterScreenNavigationProp
}

const Register: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch()

  const handleLogin = async (email: string, password: string) => {
    dispatch(login({ email, password })).then(() => {
      back()
    })
  }

  const goToRegister = () => {
    navigation.navigate(ROUTE.REGISTER)
  }

  const back = () => {
    navigation.navigate(ROUTE.APP)
  }

  return (
    <LoginView goToRegister={goToRegister} login={handleLogin} back={back} />
  )
}

export default memo(Register)
