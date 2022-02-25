import { Skeleton } from '@chakra-ui/react'
import { FC } from "react";

type ILoadingWrapper = {
    children: JSX.Element[] | JSX.Element,
    isLoaded: boolean,
}

const LoadingWrapper: FC<ILoadingWrapper> = ({ children, isLoaded }) => {
    return isLoaded ?
        <>{children}</> :
        <Skeleton startColor='brown.500' endColor='orange.500' height='2px' speed={0.5} />
}

export default LoadingWrapper
