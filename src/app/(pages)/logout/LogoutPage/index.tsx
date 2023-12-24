'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Settings } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'

export const LogoutPage: React.FC<{
  settings: Settings
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Erfolgreich ausgeloggt.')
      } catch (_) {
        setError('Sie sind bereits ausgeloggt.')
      }
    }

    performLogout()
  }, [logout])

  return (
    <Fragment>
      {(error || success) && (
        <div>
          <h1>{error || success}</h1>
          <p>
            {'Was möchten Sie als Nächstes tun?'}
            {typeof productsPage === 'object' && productsPage?.slug && (
              <Fragment>
                {' '}
                <Link href={`/${productsPage.slug}`}>Hier klicken</Link>
                {` Zum Einkaufen.`}
              </Fragment>
            )}
            {` Um sich wieder anzumelden, `}
            <Link href="/login">Hier klicken</Link>
            {'.'}
          </p>
        </div>
      )}
    </Fragment>
  )
}
