import { createCoachingData, updateCoachingData } from '@graphql/mutations'
import { getCoachingData, listCoachingDatas } from '@graphql/queries'
import {
  CreateCoachingDataInput,
  CreateCoachingDataMutation,
  GetCoachingDataQuery,
  ListCoachingDatasQuery,
  UpdateCoachingDataInput,
  UpdateCoachingDataMutation,
  Stage
} from 'API'
import { graphqlOperation, API, Auth } from 'aws-amplify'

type CoachingData = {
  id: string
  userId: string
  stage: Stage | null
  activeWeek: string | null
  started: string | null
  ended: string | null
  lessons: Array<string | null> | null
  createdAt: string
  updatedAt: string
  owner: string | null
}

type Response = Exclude<
  ListCoachingDatasQuery['listCoachingDatas'],
  null
>['items']
export const listCoaching = async (): Promise<Response> => {
  try {
    const {
      data: { listCoachingDatas: data }
    } = (await API.graphql(graphqlOperation(listCoachingDatas))) as {
      data: ListCoachingDatasQuery
    }

    if (data?.items) {
      return data?.items
    }
    return []
  } catch (error) {
    return error
  }
}

export const getCoaching = async (
  key: string,
  { id }: { id: string }
): Promise<GetCoachingDataQuery['getCoachingData']> => {
  try {
    const {
      data: { getCoachingData: data }
    } = (await API.graphql(graphqlOperation(getCoachingData, { id }))) as {
      data: GetCoachingDataQuery
    }

    return data
  } catch (error) {
    return error
  }
}

export const createCoaching = async ({
  coaching
}: {
  coaching: CreateCoachingDataInput
}): Promise<CreateCoachingDataMutation> => {
  try {
    const { username } = await Auth.currentUserInfo()
    const input: CreateCoachingDataInput = {
      ...coaching,
      userId: username
    }

    const { data } = (await API.graphql(
      graphqlOperation(createCoachingData, { input })
    )) as {
      data: CreateCoachingDataMutation
    }
    return data
  } catch (error) {
    return error
  }
}

export const updateCoaching = async ({
  coaching
}: {
  coaching: UpdateCoachingDataInput
}): Promise<UpdateCoachingDataMutation> => {
  try {
    const { username } = await Auth.currentUserInfo()

    const input: UpdateCoachingDataInput = {
      ...coaching,
      userId: username
    }

    console.log(input)

    const { data } = (await API.graphql(
      graphqlOperation(updateCoachingData, { input })
    )) as {
      data: UpdateCoachingDataMutation
    }
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}
