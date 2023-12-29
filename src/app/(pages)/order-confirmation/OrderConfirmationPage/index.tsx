'use client'

import React, { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams.get('order_id')
  const error = searchParams.get('error')

  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div>
      {error ? (
        <Fragment>
          <Message error={error} />
          <p>
            {`Ihre Zahlung war erfolgreich, aber es gab einen Fehler bei der Verarbeitung Ihrer Bestellung. Bitte kontaktieren Sie uns, um dieses Problem zu klären.`}
          </p>
          <div className={classes.actions}>
            <Button
              href={`/account/orders/${orderID}`}
              label="Konto anzeigen"
              appearance="primary"
            />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/account/orders`}
              label="Alle Bestellungen anzeigen"
              appearance="secondary"
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1 className={classes.title}>Vielen Dank für Ihre Bestellung!</h1>
          <p className={classes.messageSuccess}>
            {`Ihre Bestellung wurde bestätigt. Sie erhalten in Kürze eine Bestätigungs-E-Mail. Ihre Bestellnummer lautet: `}
          </p>
          <span className={classes.orderId}>${orderID}.</span>
          <div className={classes.actions}>
            <Button href={`/orders/${orderID}`} label="Bestellung anzeigen" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="Alle Bestellungen anzeigen"
              appearance="secondary"
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}
