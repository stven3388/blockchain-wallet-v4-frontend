import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  SettingComponent,
  SettingContainer,
  SettingDescription,
  SettingHeader,
  SettingSummary
} from 'components/Setting'

import { Button } from 'blockchain-info-components'

const RestoreLockboxDevice = props => {
  const { onClick } = props

  return (
    <SettingContainer>
      <SettingSummary>
        <SettingHeader>
          <FormattedMessage
            id='scenes.lockbox.settings.restorelockboxdevice.title'
            defaultMessage='Restore Lockbox Device'
          />
        </SettingHeader>
        <SettingDescription>
          <FormattedMessage
            id='scenes.lockbox.settings.restorelockboxdevice.description'
            defaultMessage='Get step by step instructions to restore your device in our user guide'
          />
        </SettingDescription>
      </SettingSummary>
      <SettingComponent>
        <Button nature='primary' onClick={onClick}>
          <FormattedMessage
            id='scenes.lockbox.settings.restorelockboxdevice.restore'
            defaultMessage='ICON'
          />
        </Button>
      </SettingComponent>
    </SettingContainer>
  )
}

export default RestoreLockboxDevice