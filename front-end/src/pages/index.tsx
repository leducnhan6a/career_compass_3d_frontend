import Problem from '@components/Problem';
import TargetC from '@components/TargetC';
import { BreakpointsContext } from '@context/breakpointsContext';
import Layout from '@layouts/Layouts';
// import useHoverEffect from '@hooks/useHoverEffect';
import { useLenis } from 'lenis/react';
import React, { useContext } from 'react'

export default function Home() {
  const { isMaxWidth } = useContext(BreakpointsContext)
  console.log(isMaxWidth);
  useLenis((lenis) => {
    if (lenis.isScrolling) {
      console.log('Scrolling...')
    }

    if (lenis.progress === 1) {
      console.log('At the end!')
    }
  })

  return (
    <Layout>
      <Problem />
      <TargetC />
      {/* <CoFounder /> */}
    </Layout>
  )
}
