import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Field, reduxForm } from 'redux-form'

import { isEmpty } from 'ramda'
import { Button, HeartbeatLoader, Icon, Text } from 'blockchain-info-components'
import { Form, SelectBox } from 'components/Form'
import MinimumAmountLink from './MinimumAmountLink'
import MaximumAmountLink from './MaximumAmountLink'
import TextBox from './TextBox'
import { MaximumAmountMessage, MinimumAmountMessage, InsufficientAmountMessage } from './validationMessages'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 30px 30px 10px 30px;
  box-sizing: border-box;
  border: 1px solid ${props => props.theme['gray-2']};
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: flex-start;
  width: 100%;
  height: ${props => props.height || 'auto'};
  margin-bottom: 10px;
`
const Cell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${props => props.size === 'small' ? 'center' : 'flex-start'};
  width: ${props => props.size === 'small' ? '10%' : '45%'};
  height: 100%;
`
const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  & > * { margin-right: 2px; }
`
const AmountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`
const CurrencyBox = styled(Text)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: 13px;
  font-weight: 500;
  transform: uppercase;
  background-color: ${props => props.theme['gray-1']};
`

const Success = props => {
  const { accounts, enabled, currency, sourceCoin, targetCoin, formError, handleSwap, handleSubmit } = props
  console.log('props', props)

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Row justify='flex-end'>
          <Text size='12px' weight={300}>
            <FormattedMessage id='scenes.exchange.shapeshift.firststep.step' defaultMessage='Step 1 of 2' />
          </Text>
        </Row>
        <Row>
          <Cell>
            <Text size='14px' weight={400}>
              <FormattedMessage id='scenes.exchange.shapeshift.firststep.from' defaultMessage='Exchange:' />
            </Text>
          </Cell>
          <Cell size='small' />
          <Cell>
            <Text size='14px' weight={400}>
              <FormattedMessage id='scenes.exchange.shapeshift.firststep.to' defaultMessage='Receive:' />
            </Text>
          </Cell>
        </Row>
        <Row height='50px'>
          <Cell>
            <Field name='source' component={SelectBox} elements={accounts} />
          </Cell>
          <Cell size='small'>
            <Icon name='exchange-2' size='24px' weight={500} cursor onClick={handleSwap} />
          </Cell>
          <Cell>
            <Field name='target' component={SelectBox} elements={accounts} />
          </Cell>
        </Row>
        <Row justify='space-between'>
          <Text size='14px' weight={400}>
            <FormattedMessage id='scenes.exchange.shapeshift.firststep.amount' defaultMessage='Enter amount:' />
          </Text>
        </Row>
        <Row>
          <Text size='12px' weight={300} color='error'>
            {formError && formError === 'minimum' && <MinimumAmountMessage />}
            {formError && formError === 'maximum' && <MaximumAmountMessage />}
            {formError && formError === 'insufficient' && <InsufficientAmountMessage />}
          </Text>
        </Row>
        <Row height='80px'>
          <Cell>
            <AmountContainer>
              <Field name='sourceAmount' component={TextBox} />
              <CurrencyBox>{sourceCoin}</CurrencyBox>
            </AmountContainer>
            <AmountContainer>
              <Field name='sourceFiat' component={TextBox} />
              <CurrencyBox>{currency}</CurrencyBox>
            </AmountContainer>
          </Cell>
          <Cell size='small'>
            {enabled
              ? <Icon name='right-arrow' size='24px' weight={500} cursor />
              : <HeartbeatLoader width='20px' height='20px' />
            }
          </Cell>
          <Cell>
            <AmountContainer>
              <Field name='targetAmount' component={TextBox} />
              <CurrencyBox>{targetCoin}</CurrencyBox>
            </AmountContainer>
            <AmountContainer>
              <Field name='targetFiat' component={TextBox} />
              <CurrencyBox>{currency}</CurrencyBox>
            </AmountContainer>
          </Cell>
        </Row>
        <Row>
          <OptionsContainer>
            <Text weight={300} size='12px'>
              <FormattedMessage id='scenes.exchangebox.firststep.use1' defaultMessage='Use' />
            </Text>
            <MinimumAmountLink />
            <Text weight={300} size='12px'>
              <FormattedMessage id='scenes.exchangebox.firststep.use2' defaultMessage='| Use' />
            </Text>
            <MaximumAmountLink />
          </OptionsContainer>
        </Row>
        <Row>
          <Button type='submit' nature='primary' fullwidth disabled={!isEmpty(formError)}>
            <FormattedMessage id='scenes.exchange.shapeshift.firststep.next' defaultMessage='Next' />
          </Button>
        </Row>
      </Form>
    </Wrapper>
  )
}

export default reduxForm({ form: 'exchange', destroyOnUnmount: false })(Success)
