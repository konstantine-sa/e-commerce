import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import { RenderParams } from '../../_components/RenderParams'
import { LowImpactHero } from '../../_heros/LowImpact'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'

import classes from './index.module.scss'

export default async function Account() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Sie müssen angemeldet sein, um auf Ihr Konto zugreifen zu können.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  return (
    <div>
      <h5 className={classes.personalInfo}>Persönliche Informationen</h5>
      <AccountForm />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Account',
  description: 'Konto erstellen oder in Ihr bestehendes Konto einloggen.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
}
