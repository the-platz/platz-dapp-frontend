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
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon, LockIcon, SearchIcon } from '@chakra-ui/icons';
import { ICurrentUser } from '../..';
import { WalletConnection } from 'near-api-js';
import { IContract } from '../../App';

const Links = [{name: 'About', link: '/about'}];

interface IHeaderProps {
  currentUser: ICurrentUser | null,
  walletConnection: WalletConnection,
  contract: IContract
}

const Header: React.FC<IHeaderProps> = ({currentUser, walletConnection, contract}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const signIn = () => {
    walletConnection.requestSignIn(
      {
        contractId: contract.contractId,
        methodNames: [contract.create_account_campaign.name, contract.donate.name]
      }, //contract requesting access
      'Platz App', //optional name
      'localhost:3000', //optional URL to redirect to if the sign in was successful
    );
  };

  const signOut = () => {
    walletConnection.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

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
        <HStack spacing={8} alignItems={'center'}>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<SearchIcon color='gray.300' />}
            />
            <Input type='tel' placeholder='Find KOLs' />
          </InputGroup>
        </HStack>
        <Flex alignItems={'center'}>
          {!currentUser ?
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              onClick={signIn}
              leftIcon={<LockIcon />}>
              Login
            </Button>
            :
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              onClick={signOut}
              leftIcon={<LockIcon />}>
              Logout
            </Button>
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
