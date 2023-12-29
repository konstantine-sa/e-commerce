import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Gutter } from '../../../_components/Gutter'
import { HR } from '../../../_components/HR'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { formatDateTime } from '../../../_utilities/formatDateTime'
import { getMeUser } from '../../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph'

import classes from './index.module.scss'

export default async function Order({ params: { id } }) {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to view this order.',
    )}&redirect=${encodeURIComponent(`/order/${id}`)}`,
  })

  let order: Order | null = null

  try {
    order = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })?.then(async res => {
      if (!res.ok) notFound()
      const json = await res.json()
      if ('error' in json && json.error) notFound()
      if ('errors' in json && json.errors) notFound()
      return json
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!order) {
    notFound()
  }

  return (
    <Gutter className={classes.orders}>
      <div className={classes.orderDescription}>
        <p className={classes.orderTitle}>{`Bestellung Nummer: `}</p>
        <p className={classes.orderTextValue}>{`${order.id}`}</p>

        <p className={classes.orderText}>{`Zahlungsabsicht: `}</p>
        <p className={classes.orderTextValue}>{order.stripePaymentIntentID}</p>
        <p className={classes.orderText}>{`Bestellt am: `}</p>
        <p className={classes.orderTextValue}>{formatDateTime(order.createdAt)}</p>
        <p className={classes.total}>{'Gesamtbetrag: '}</p>
        <p className={classes.total}>
          {new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }).format(order.total / 100)}
        </p>
      </div>

      <HR />

      <div className={classes.order}>
        <h4 className={classes.orderItems}>Artikel</h4>
        <HR />
        {order.items?.map((item, index) => {
          if (typeof item.product === 'object') {
            const {
              quantity,
              product,
              product: { id, title, meta, stripeProductID },
            } = item

            const isLast = index === (order?.items?.length || 0) - 1

            const metaImage = meta?.image

            return (
              <Fragment key={index}>
                <div className={classes.row}>
                  <Link href={`/products/${product.slug}`} className={classes.media}>
                    {!metaImage && <span className={classes.placeholder}>Kein Bild</span>}
                    {metaImage && typeof metaImage !== 'string' && (
                      <Media
                        className={classes.media}
                        imgClassName={classes.image}
                        resource={metaImage}
                        // fill
                      />
                    )}
                  </Link>
                  <div className={classes.rowContent}>
                    {!stripeProductID && (
                      <p className={classes.warning}>
                        {'This product is not yet connected to Stripe. To link this product, '}
                        <Link
                          href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/products/${id}`}
                        >
                          edit this product in the admin panel
                        </Link>
                        {'.'}
                      </p>
                    )}
                    <div className={classes.productWrapper}>
                      <h5 className={classes.productTitle}>
                        <Link href={`/products/${product.slug}`} className={classes.titleLink}>
                          {title}
                        </Link>
                      </h5>
                      <p className={classes.productQty}>{`Menge: `}</p>
                      <Price product={product} button={false} quantity={quantity} />
                      <p className={classes.productQty}>{quantity}</p>
                    </div>
                  </div>
                </div>
                {!isLast && <HR />}
              </Fragment>
            )
          }

          return null
        })}
      </div>
      <HR />
      <div className={classes.actions}>
        <Button href="/orders" appearance="primary" label="Alle Bestellungen anzeigen" />
        <Button href="/account" appearance="secondary" label="Zum Konto" />
      </div>
    </Gutter>
  )
}

export async function generateMetadata({ params: { id } }): Promise<Metadata> {
  return {
    title: `Bestellung ${id}`,
    description: `Bestelldetails für die Bestellung ${id}.`,
    openGraph: mergeOpenGraph({
      title: `Order ${id}`,
      url: `/orders/${id}`,
    }),
  }
}
