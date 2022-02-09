import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom"
import { HamburgerIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons'
import { BiUserCircle } from "react-icons/bi";
import { ICurrentUser } from '../..'
import { WalletConnection } from 'near-api-js'
import { IContract } from '../../App'
import { useCallback, useEffect, useRef, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import { useGlobalContext } from '../../globalContext'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { walletConnect } from '../../reducers/walletConnect';

const Links = [{name: 'About', link: '/about'}];

interface IHeaderProps {
  currentUser: ICurrentUser | null,
  walletConnection: WalletConnection,
  contract: IContract
}

const Header: React.FC<IHeaderProps> = ({currentUser, walletConnection, contract}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { campaignFactory } = useGlobalContext()
  const navigate = useNavigate();

  const searchWrapperRef = useRef<HTMLDivElement>(null)
  const [visibleSearchResult, setVisibleSearchResult] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const debounceSearchText = useDebounce<string>(searchText)
  const [searchCampaigns, setSearchCampaigns] = useState<string[]>([])

  useOnClickOutside(searchWrapperRef, () => {
    setVisibleSearchResult(false)
  })

  const signOut = () => {
    walletConnection.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isLoading) setIsLoading(true)
      setVisibleSearchResult(!!e.target.value)
      setSearchText(e.target.value)
    },
    [isLoading]
  )

  useEffect(() => {
   if (Boolean(visibleSearchResult && debounceSearchText && isLoading)) {
    campaignFactory?.account_campaigns?.forEach(campaign => {
      if (campaign.toLowerCase().includes(debounceSearchText.toLowerCase())) {
        if (!!searchCampaigns) {
          setIsLoading(false)
          return setSearchCampaigns([...searchCampaigns, campaign])
        }
        setIsLoading(false)
        return setSearchCampaigns([campaign])
      }
    })
   }
  }, [visibleSearchResult, debounceSearchText, campaignFactory, searchCampaigns, isLoading])

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Link to="/">
            <Box>Platz Logo</Box>
          </Link>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <Link key={link.link} to={link.link}>{link.name}</Link>
            ))}
          </HStack>
        </HStack>
        <HStack spacing={8} alignItems={'center'} sx={{ position: 'relative' }} ref={searchWrapperRef}>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<SearchIcon color='gray.300' />}
            />
            <Input type='text' placeholder='Find KOLs' onChange={handleSearchChange}/>
          </InputGroup>
          {visibleSearchResult && (
            <Box sx={{ position: 'absolute', top: '52px', left: '-2rem', bg: 'gray.100', borderRadius: 'md', zIndex: 999 }}>
              {isLoading ? (
                <Box textAlign="center" py={4}>
                  Loading...
                </Box>
                ) : (
                  <Flex flexDirection="column">
                      {searchCampaigns?.length > 0 ?
                        searchCampaigns.map((campaign, index) => (
                          <Flex key={`${index}-${campaign}`} flexDirection="column" px={3} py={2}>
                            {campaign}
                          </Flex>
                          ))
                        : (
                          <Box textAlign="center" py={4}>
                            Không có kết quả bạn muốn tìm thấy
                          </Box>
                        )
                      }
                  </Flex>
                )
              }
            </Box>
          )}
        </HStack>
        <Flex alignItems={'center'}>
          {!currentUser ?
            <Button
              variant='ghost'
              colorScheme='blackAlpha'
              mr={4}
              textColor={'black'}
              onClick={walletConnect}>
              Sign in
            </Button>
            :
            <Menu>
              <MenuButton 
                as={IconButton}
                isRound={true}
                variant='ghost'
                colorScheme='blackAlpha'
                aria-label='Call Sage'
                textColor={'black'}
                fontSize='35px'
                icon={<BiUserCircle />}>
                Profile
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => { navigate("/createcampaign", { replace: true }); }}>
                    Create campaign
                </MenuItem>
                <MenuItem onClick={() => { navigate("/mycampaigns", { replace: true }); }}>
                    My campaigns
                </MenuItem>
                <MenuItem onClick={() => { navigate("/myaccount", { replace: true }); }}>
                  My account
                </MenuItem>
                <MenuItem onClick={signOut}>
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          }
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <Link key={link.link} to={link.link}>{link.name}</Link>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default Header;
