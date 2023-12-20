import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { RecoverPasswordForm } from './RecoverPasswordForm'

import classes from './index.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import logoBlack from '../../../../public/logo_black.png'
import { RenderParams } from '../../_components/RenderParams'

export default async function RecoverPassword() {
  return (
    <section className={classes.recoverPassword}>
      {/* logo */}
      <div className={classes.heroImg}></div>

      {/* form */}
      <div className={classes.formWrapper}>
        <Link href="/" className={classes.logoContainer}>
          <Image src={logoBlack} alt="logo" width={170} height={23} className={classes.logo} />
        </Link>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <Link href="/login" className={classes.backLink}>
            <Image src="/assets/icons/arrow-left.svg" alt="left arrow" width={24} height={24} />
            <p>Zurück</p>
          </Link>

          <div className={classes.formTitle}>
            <h3>Passwort wiederherstellen</h3>
          </div>

          <RecoverPasswordForm />
        </div>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Recover Password',
  description: 'Enter your email address to recover your password.',
  openGraph: mergeOpenGraph({
    title: 'Recover Password',
    url: '/recover-password',
  }),
}
