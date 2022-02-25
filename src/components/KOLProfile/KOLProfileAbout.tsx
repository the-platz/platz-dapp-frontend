import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { FC } from 'react'

type IKOLProfileAboutProps = {
    displayName: string | undefined
}

const KOLProfileAbout: FC<IKOLProfileAboutProps> = ({ displayName }) => {
    return (
        <Box>
            <Flex
                justifyContent="center"
                flexDirection="column"

                mx="auto"
                maxWidth="984"
                overflow="auto"
                px={[4, 3, 2, 0]}
            >
                <Flex
                    position="relative"
                    mt={4}
                    height="560px"
                    bgImg="linear-gradient(to bottom right, #4e353b, #e9c27a)"
                    borderRadius="md"
                    overflow="hidden"
                >
                    <Image
                        src="/images/default_kol_about.png"
                        maxH="480px"
                        position="absolute"
                        top="80px"
                        right="0"
                        zIndex="101"
                        display={['none', 'block']}
                    />
                    <Text
                        fontSize={['7xl', '9xl']}
                        color="transparent"
                        fontWeight="medium"
                        p={3}
                        textShadow="1px 1px 1px black"
                        textTransform="uppercase"
                        position="absolute"
                        top="-5"
                        right="28px"
                        zIndex="100"
                        opacity="0.5"
                    >
                        Platz
                    </Text>

                    <Text
                        fontSize={['3xl', '4xl']}
                        color="white"
                        fontWeight="medium"
                        p={3}
                        position="absolute"
                        top="20%"
                        left="10%"
                        zIndex="100"
                    >
                        Hi! I'm
                    </Text>
                    <Text
                        fontSize={['2xl', '4xl', '5xl']}
                        color="#e9d0b1"
                        fontWeight="bold"
                        p={3}
                        position="absolute"
                        top="27%"
                        left="10%"
                        zIndex="100"
                        letterSpacing="wider"
                    >
                        {displayName || 'undefined'}
                    </Text>
                    <Text
                        fontSize={['lg', 'xl']}
                        color="white"
                        fontWeight="medium"
                        p={3}
                        position="absolute"
                        top="50%"
                        left="10%"
                        zIndex="100"
                        maxWidth="420px"
                        textOverflow="nowrap"
                    >
                        Artist, influencer, troublemaker, streamer... I like creative stuff.
                        Dedicated to bringing joy to the community.
                    </Text>
                </Flex>
            </Flex>
            <Flex
                justifyContent="center"
                flexDirection="column"
                my={24}
                mx="auto"
                maxWidth="984"
                overflow="auto"
                px={[4, 3, 2, 0]}
            >
                <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">
                    VR Liveshows
                </Text>
                <iframe
                    width="auto"
                    height="680px"
                    src="https://www.youtube.com/embed/yoyf00nWASY"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </Flex>

            <Flex
                justifyContent="center"
                flexDirection="column"
                my={10}
                mx="auto"
                maxWidth="984"
                overflow="auto"
                px={[4, 3, 2, 0]}
            >
                <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">
                    VR Gallery
                </Text>
                <iframe
                    title="vr-gallery"
                    src="https://embed.artland.com/shows/jesse-wright-reverie-c7tl8li8fhcs73ua54ug"
                    width="auto"
                    height="680px"
                    frameBorder="0"
                    scrolling="on"
                    allowFullScreen={true}
                ></iframe>
            </Flex>
        </Box>
    )
}

export default KOLProfileAbout