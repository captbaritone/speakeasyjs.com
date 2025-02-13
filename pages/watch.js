/* global Twitch */

import { useEffect } from 'react'
import loadScript from 'load-script2'

import {
  Box,
  Container,
  Heading,
  Stack
} from '@chakra-ui/core'

import { ButtonLink } from '../components/ButtonLink'
import { Event } from '../components/Event'
import { Header } from '../components/Header'

import { getCurrentEvent } from '../lib/events'
import { colorScheme } from '../theme'

const WatchPage = ({ currentEvent }) => {
  useEffect(() => {
    ;(async () => {
      await loadScript('https://embed.twitch.tv/embed/v1.js')
      window.twitch = new Twitch.Embed('twitch-embed', {
        width: '100%',
        height: 600,
        channel: 'speakeasyjs'
      })
    })()
    return () => {
      document.querySelector('#twitch-embed').innerHTML = ''
    }
  }, [])

  return (
    <Box
      px={4}
      py={32}
      fontSize='lg'
    >
      <Header showBuyButton={false} />

      <Container maxWidth='lg'>
        <Stack spacing={20} align='center'>
          <Heading as='h1' size='xl' mt={[0, 4, 6]} textAlign='center'>
            You've found it. Here's what's going down.
          </Heading>

          <Event
            event={currentEvent}
          />

          <Box
            id='twitch-embed'
            width='full'
          />

          <Stack spacing={8} align='center'>
            <Heading as='h1' size='lg' textAlign='center'>
              Get your ticket to next week's event!
            </Heading>
            <ButtonLink
              colorScheme={colorScheme}
              size='lg'
              href='/buy'
            >
              Get a free ticket
            </ButtonLink>
          </Stack>
        </Stack>

      </Container>
    </Box>
  )
}

export default WatchPage

export async function getServerSideProps (ctx) {
  return {
    props: {
      title: 'Watch Now',
      description: 'Watch Speakeasy JS now',
      currentEvent: getCurrentEvent()
    }
  }
}
